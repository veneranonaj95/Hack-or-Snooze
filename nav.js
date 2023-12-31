"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

function navSubmitStoryClick() {
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}

$navSubmitStory.on("click", navSubmitStoryClick);

//TODO define navFavoritesClick function
//$body.on("click","#nav-favorites", navFavoritesClick);

function $navFavoritesClick(evt) {
  console.debug("navFavoriteClick", evt);
  evt.preventDefault();
  hidePageComponents();
  putFavoritesListOnPage();
}

$body.on("click", "#nav-favorites", $navFavoritesClick);

function navMyStories(evt) {
  console.debug("navMyStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putUserStoriesOnPage();
  $ownStories.show();
}

$body.on("click", "#nav-my-stories", navMyStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function navProfileClick(evt) {
  console.debug("navProfileClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $userProfile.show();
}

$navUserProfile.on("click", navProfileClick);

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
