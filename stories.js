"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showDeleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  const showStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
        ${showDeleteBtn ? getDeleteBtnHTML() : ""}
        ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


async function deleteStory(evt) {
  console.debug("deleteStory");

  const username = currentUser.username
  const storyData = {title, author, url, username};
  let story = await storyList.addStory(currentUser, storyData);
  story = generateStoryMarkup(story);

$allStoriesList.prepend($story);

}

$ownStories.empty();


async function submitNewStory(evt) {
  console.debug("submitNewStory");
  evt.preventDefault();

  const title = $("#create-title").val();
  const url = $("#create-url").val();
  const author = $("#create-author").val();
  const username = currentUser.username
  const storyData = {title, url, author, username};
  
  let story = await storyList.addStory(currentUser, storyData);

  let $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  $submitForm.trigger("reset" );
  $submitForm.slideUp("slow");

}

$submitForm.on("submit", submitNewStory);


function putUserStoriesOnPage(){
  console.debug ("putUserStoriesOnPage");

  $ownStories.empty();

  if (currentUser.ownStories.length === 0) {
    $ownStories.append($("<h5>No stories added by user yet!</h5>"));
  } else {
    for (let story of currentUser.ownStories) {
      let $story = generateStoryMarkup (story, true);
      $ownStories.append($story);
    }
  }

  $ownStories.show();
}

async function favoriteStory(evt) {
  console.debug("favoriteStory");

  let storyId = evt.target.parentElement.parentElement.id;

  if($(evt.target).hasClass("fas"))
  {
    await currentUser.removeFavorite(storyId);
    $(evt.target).toggleClass("farfas");
  }
  else {
    await currentUser.addFavorite(storyId);
    $(evt.target).toggleClass("fas far");
  }
}


function showFavoritesListOnPage() {
  $favoritedStories.empty();

  if (currentUser.favorites.length === 0) {
    $favoritedStories.append("<h5>No favorite stories present</h5>");
  } else {
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoritedStories.append($story);
    }
  }

  $favoriteStories.show();
}

//Create function to add new stories
function submitNewStory 
$newStory = await storyList.addStory (currentUser, {title, author, url});

const $storyElement = generateStoryMarkup (newStory);
$allStoriesList.prepend($storyElement);

$("#submit-form").on("submit", userSubmitStory);
getandShowNewStories(); 

