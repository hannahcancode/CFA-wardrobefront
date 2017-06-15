# Jules' Wardrobe

## Table of Contents

1. [About](#about)
    1. [Problem Statement](#problemstatement)
    2. [Solution](#solution)
2. [Example](#example)
3. [Installation](#installation)
    1. [Setup](#setup)
    2. [Running on Simulator](#simulator)
    3. [Running on iPhone](#iphone)
4. [Project Charter](#charter)
    1. [Scope](#scope)
    2. [Requirements](#mvp)
    3. [Potential Features](#potential-features)
    4. [Deliverables](#deliverables)
    5. [Benefits](#benefits)
5. [Design](#design)
    1. [Wireframes](#wireframes)
    2. [User Journey](#userjourney)
    3. [ERD](#erd)
    4. [User Stories and Pricing](#trello)
5. [Project Management](#management)


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

## Project Charter <a name="charter">

### Scope <a name="scope">

To recreate the "Clueless app", as used by Cher in the movie Clueless. The app allows users to flick through photos of their own clothing items in order to visualise outfits without trying them on.

### Requirements (MVP) <a name="mvp">
- A user can add photos of their clothing to the app so they can see their own outfits
- A user can assign categories to their clothing (tops, bottoms, shoes) so the app can display them in the correct place
- A user can spin through the different categories so they can find the correct combination of clothes
- A user can save outfits so they can access them again at a later date
- A user can use the app on their phone so they can access their camera and/or camera roll

### Potential Features <a name="potential-features">

- A user can log in so they can see only their clothes and other people can't see their clothes
- A user can link the clothes they buy online to the app and import photos of recent purchase so they can keep their wardrobe updated
- A user can have their photos resized so their data is wasted uploading unnecessarily large photos.
- A user can request AI assistance to rate the style of their outfit
- A user can share their outfits with friends

### Deliverables <a name="deliverables">

- An iPhone app that meets the above 'Minimal app' requirements
- Documentation on the installation and use of the app

### Benefits <a name="benefits">

#### To Client

- A cool app she's always wanted
- A solution to the problem statement (outlined above)

#### To Developer

- Learning React Native
- Creating a front-end focussed application

## Design <a name="design">

### Initial mockup <a name="mockup">

![Inital mockup](https://res.cloudinary.com/doe2gejvd/image/upload/s--wENi3EPU--/v1497501751/IMG_9003_pgy2vo.jpg)

### Wireframes <a name="wireframes">

![Wireframes](https://res.cloudinary.com/doe2gejvd/image/upload/s--xnE5uMf9--/a_90/v1497501748/IMG_9001_aqz8fj.jpg)

### User Journey <a name="userjourney">
![User journey](https://res.cloudinary.com/doe2gejvd/image/upload/s--8QCZxX62--/a_90/v1497501751/IMG_9002_zu8ppf.jpg)

### ERD <a name="erd">

```js
const itemSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

```

### User Stories and Pricing <a name="trello">

Trello was used for project management. The screenshots below show the tracking of user stories (MVP and additional features), deliverables, client interactions, requirements and pricing.

![Trello Screenshot](https://res.cloudinary.com/doe2gejvd/image/upload/s--2dG3FbJ---/v1497501178/Screen_Shot_2017-06-12_at_4.58.57_pm_lamspj.png)
![Trello Screenshot](https://res.cloudinary.com/doe2gejvd/image/upload/s--hyXw5pIS--/v1497501183/Screen_Shot_2017-06-12_at_5.03.21_pm_tgjq58.png)
