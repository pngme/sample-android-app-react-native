# Pngme Android (React Native) SDK & Sample App

*Welcome to the Pngme v2.x React Native SDK!*<br>
This Readme will cover how the SDK works, get-started basics, and a sample Android app.

### Legacy SDK
For documentation on the legacy SDK (v1.0.34) visit [here](https://developers.api.pngme.com/docs).

### Kotlin
For the v2.x *Kotlin* docs and sample app, visit [here](https://github.com/pngme/sample-android-app-kotlin).

### Flutter
For the v2.x *Flutter* docs app, ~~visit her~~ *(COMING SOON)*

## React Native v2.x SDK - the basics

1. The SDK accomplishes three tasks:
    - register a mobile phone user with pngme's identity system
    - request permission for SMS from the user, with a [Permission Dialog Flow](.docs/permission_flow.gif)
    - periodically send SMS data to pngme's data processing pipeline
2. The SDK supports Android API level 16+
3. The SDK exposes three methods: a main entrypoint method, and two helper methods
4. Using the SDK requires an SDK `clientKey`. Sign up and get started _for free_ at the [Pngme admin webconsole](https://admin.pngme.com)

When the SDK has been successfully integrated, financial data extracted from a user's SMS will be accessible
in the [Pngme admin Webconsole](https://admin.pngme.com) or
via the Pngme REST APIs
(see the [API Reference docs](https://developers.api.pngme.com/reference/getting-started-with-your-api)).


## Get Started
To set up your project to use the Pngme SDK, follow these setup steps.

### _Step 1_
Add the SDK package to your `package.json` file (substitute the exact SDK version).
```json
{
  "dependencies": {
    "@pngme/react-native-sms-pngme-android": "^2.X.Y"
  }
}
```

### _Step 2_
Add your SDK `clientKey` to the project.
In the sample app, the `clientKey` is injected via the `.env` file:

```text
PNGME_CLIENT_KEY=XXXXXXXXXX
```

TODO: add information on securing client key

### _Step 3_
Implement the `go()` method as needed in your app.


## Methods
### `go()`
```ts
type go = (params: PngmeSDKParamType) => Promise<string>
```

```ts
interface PngmeSDKParamType {
  clientKey: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  externalId: string;
  isKycVerified: boolean;
  companyName: string;
}
```
The `go` method is an _async_ function that takes required string parameters.
The `go` method is the main entrypoint method for invoking the PngmeSdk.
The `go` method is idempotent, and can be invoked multiple times.

TODO: document definition of the returned Promise<String> from go()

The `go` method performs three tasks.
1. register a `user` in pngme's system using an Android Onetime Worker
2. show a dialog flow in the current Activity to request SMS permissions from the user --
   this _runs the first time, and only the first time_, that `go` is invoked
3. send USSD SMS messages from the user's phone to pngme's system using an Android Periodic Worker

| var name | description |
| -------- | ----------- |
| clientKey | the Pngme SDK key for your account (see above) |
| firstName | the mobile phone user's first name |
| lastName | the mobile phone user's last name |
| email | the mobile phone user's email address |
| phoneNumber | the mobile phone user's phone number, example `"23411234567"` |
| externalId | a unique identifier provided by your app (if none available, pass an empty string `""`)|
|isKycVerified | a boolean, indicating if your app has verified the user's identity using KYC |
| companyName | your company's name; this is used in the display header of the permissions UI flow |

### `resetPermissionFlow()`

```ts
type resetPermissionFlow = () => void
```

As noted above, the Permission Dialog Flow will only run the first time that the `go` method is invoked.
If your app needs to implement logic to show the Dialog Flow again,
then you can reset the permission flow by calling `resetPermissionFlow`.
The next time you call `go`, the Permission Dialog Flow will show again.

Example:
```ts
go(args) // permissions flow runs
go(args)  // permission flow will NOT show again
resetPermissionFlow(args)
go(args)  // permission flow runs
```

See the code snippets in the below documentation on the example app
for implementations where you might consider using this method to control the Permission Dialog Flow.

### `isPermissionGranted()`

```ts
type isPermissionGranted = () => Promise<boolean>
```

A simple _async_ helper function to indicate if the user has accepted the SMS permissions request.
Returns a Promise with `true` if the user has accepted the SMS permission request.
Returns a Pr0mise with `false` if the user has denied the SMS permission request.

## Sample Android App
This repository is a sample Android app, which uses the Pngme SDK.
This app uses the `.env` file to inject the SDK `clientKey`.
TODO: refine below, if there are recommendations on better securing the client key
~~Please note that this is for example purposes only.
As noted in [Step 3](### _Step 3_) of the get [started section](## get started),
it is highly recommended that a production application use a more secure method of injecting the `clientKey` secret.~~

This app can be compiled and emulated locally, with or without a valid SDK `clientKey`.
If a valid SDK `clientKey` is used, then data can be sent thru to the pngme system while testing in emulation mode.
To run the sample app locally, simply install dependencies and launch the react native android app:
```bash
npm install  # alternative: yarn install
npx react-native run-android
```
⬆️ Running the above assumes you have set up your environment for Android development in React Native.
See the [React Native Offical Docs](https://reactnative.dev/docs/environment-setup)

### Behavior
The sample app demonstrates a simple flow:
1. user creates an account with the app
2. the user goes to apply for a loan, and has the option of selecting to use the Pngme service
3. if the Pngme service is selected, the SDK is invoked, and the [Permission Flow](.docs/permission_flow.gif) is presented
4. when the permission flow exits, the user is presented with the loan application page

The SDK is implemented in the `screens/permissions/index.js`, when the user clicks on the *Continue* button:
```ts
const handleContinue = async() => {
    if (toggleCheckBox) {
      // if user confirm they want to use Pngme, we store that selection
      setUser({ pngmePermissionWasSelected: true });
      await go({
        clientKey: RNConfig.PNGME_CLIENT_KEY,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: `234${user.phone}`,
        isKycVerified: false,
        companyName: 'Acme Bank',
        externalId: '',
      });
      navigateToLoanScreen();
    } else {
      navigateToLoanScreen();
    }
  }
```

The app remembers the selection in step 2.
If the user chooses to enable the Pngme service,
then the checkbox stays selected for all future loan applications.
The [Permission Flow](.docs/permission_flow.gif) is only showed the very first time,
_regardless of if the user accepts or denies the permissions_.

#### Show Permissions Flow Multiple Times
Alternative behavior is to continue requesting SMS permissions if they were previously denied.
Adding the following snippet will reset the Permission Flow
if SMS permissions had been previously denied but not [permanently ignored](.docs/permissions.md).

```ts
const handleContinue = async() => {
    if (toggleCheckBox) {
        // if user confirm they want to use Pngme, we store that selection
        setUser({ pngmePermissionWasSelected: true });

        const permissionGranted = await isPermissionGranted();
        const canPermissionBeAsked = await canPermissionBeAskedAgain();
        if (!permissionGranted && canPermissionBeAsked) {
            resetPermissionFlow();
        }
        
        await go({
            clientKey: RNConfig.PNGME_CLIENT_KEY,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: `234${user.phone}`,
            isKycVerified: false,
            companyName: 'Acme Bank',
            externalId: '',
        });
        navigateToLoanScreen();
    } else {
        navigateToLoanScreen();
    }
}
```



## Environment variables handling

We Higly recommend to use any libary to handle .env files, your Pngme key is secret to please do not hardcode it you your code. Remember that push secret keys to a repo is never a good idea.
Also by having env files you can maintain your **sandbox** and **production** keys separately and ready to build with the correct environment

## Where Pngme library is used on this demo app?

If you only want to know how [Pngme npm library](https://www.npmjs.com/package/@pngme/react-native-sms-pngme-android) is used you can check `src/screens/permissions/index.js` there you will see how we use the library for this Acme bank sample project
