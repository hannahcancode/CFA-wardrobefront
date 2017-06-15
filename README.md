# Jules' Wardrobe

## Table of Contents

1. [About](#About)
  1. [Problem Statement](#problemstatement)
  2. [Solution](#solution)
2. [Example](#example)
3. [Installation](#installation)
  1. [Setup](#setup)
  2. [Running on Simulator](#simulator)
  3. [Running on iPhone](#iphone)


## About <a name="about">

Jules' wardrobe is a recreation of the infamous app from the movie Clueless - 'Cher's Closet'.

### Problem Statement <a name="problemstatement">

#### Background <a name="background">

There have been a number of apps and websites that are similar to 'the clueless app', but none that actually attempt to recreate the purpose of the app - to show clothes in a similar arrangement to how they would look on a person, to allow for the shuffling of clothes, and to make a style judgement. My client loves clothes and fashion, and has always wanted her own version of the app to use.

#### Real World <a name="realworld">

Childhood dreams of being an LA socialite/Austen hero aside, many a 'floordrobe' is created from trying on various outfit combinations that don't coordinate or suit your style for the day. It can be hard to visualise combinations of clothes together without removing them from your wardrobe and placing them against each other. Inspiration can also sometimes be lacking - how often have you worn the same outfit again and again because you just don't know another combination that would look good together?

### Solution <a name="solution">

Jules' wardrobe provides a visual representation of potential outfits. It allows users to upload photos of images or their clothing, categorize the images as being a 'top', 'bottom' or 'shoes', and then displays them back to the user. The user is then able to either manually spin through the clothing to decide on an outfit or visualise an outfit they already have in mind, or, if inspiration is lacking, select the shuffle function to create a randomised outfit.

## Example <a name="example">

![Example app screenshot](https://res.cloudinary.com/doe2gejvd/image/upload/s--0FGz38Ym--/c_scale,w_441/v1497253693/Screen_Shot_2017-06-12_at_5.47.07_pm_yn9vio.png)

## Installation <a name="installation">

As this is a native app that needs to run on an iOS device (or simulator), the installation is a little more involved.

### Initial setup <a name="setup">

- Create a [Cloudinary](https://www.cloudinary.com/) account to store images

- This app requires a RESTful API backend. Please see the [repository](https://github.com/hannahcancode/wardrobe) for the Jules' Wardrobe node backend for further information.

- Create a .env file in the root folder and add your CLOUDINARY_KEY, CLOUDINARY_SECRET and WARDROBE_API as environmental variables.

- Install node and watchman:

  ```
  $ brew install node
  $ brew install watchman
  ```

- Install React Native command line interface:

  ```
  $ npm install -g react-native-cli
  ```

### iPhone Simulator <a name="simulator">

  - In order to run React Native applications on the iPhone simulator, you must first have Xcode installed (visit the [The Apple website](https://developer.apple.com/xcode/) for installation instructions)

- Once cloned, in terminal, navigate to the root folder and run:

  ```
  $ yarn install
  $ react-native run-ios
  ```

- The app will then compile and open in the Xcode simulator

### iPhone <a name="iphone">

- Follow the instructions on the [React Native documentation](https://facebook.github.io/react-native/docs/running-on-device.html) to run your app on your iPhone (support not guaranteed for Android)

#### In brief:  
- Install Xcode on your computer (as above)
- Sign up for an Apple Developer account
- Open the iOS Xcode file and add your developer account
- Connect your phone to your computer with USB
- Select your phone in Xcode and press play to compile the app and play on your phone.
