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
  console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  const showStar = Boolean(currentUser);

   return $(`
      <li id="${story.storyId}">
        <div>
          <span class="star">
          <i class="bi bi star"></i> 
          </span>
          <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
         </a>
          <small class="story-hostname">(${hostName})</small>
          <small class="story-author">by ${story.author}</small>
         <small class="story-user">posted by ${story.username}</small>
         </div>
      </li>
    `);
}



/**Make Delete Button HTML */

/* function getDeleteBtnHTML() {
  return `
      <span class="trash-can">
        <i class="fas fa-trash-alt"></i>
      </span>`;
}


/** Make favorite/not-favorite star */

/* function getStarHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `
      <span class="star">
        <i class="${starType} fa-star"></i>
      </span>`;
}



/** Gets list of stories from server, generates their HTML, and puts on page. */

async function putStoriesOnPage() {
  storyList = await StoryList.getStories();

  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

$storyForm.on("submit", submitNewStory)

async function deleteStory(evt) {
  console.debug("deleteStory");

await storyList.removeStory(currentUser, storyId);
await putUserStoriesOnPage();

}

$ownStories.on("click", ".trash-can", deleteStory);


async function submitNewStory(evt) {
  console.debug("submitNewStory");
  

  const title = $("#create-title").val();
  const url = $("#create-url").val();
  const author = $("#create-author").val();
  const username = currentUser.username;
  const storyData = { title, url, author, username };
  
  let story = await storyList.addStory(currentUser, storyData);

  story = generateStoryMarkup(story);

  $allStoriesList.prepend($story);

  $submitForm.slideUp("slow");
  $submitForm.trigger("reset");

}

$submitForm.on("submit", submitNewStory);


function putUserStoriesOnPage() {
  console.debug("putUserStoriesOnPage");

  $ownStories.empty();

  if (currentUser.ownStories.length === 0) {
    $ownStories.append($("<h5>No stories added by user yet!</h5>"));
  } else {
    for (let story of currentUser.ownStories) {
      let $story = generateStoryMarkup(story, true);
      $ownStories.append($story);
    }
  }

  $ownStories.show();
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

async function toggleStoryFavorite(evt) {
  console.debug("toggleStoryFavorite");

  const $tgt = $(evt.target);
  const $closetLi = $tgt.closest("li");
  const $storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);

  if ($tgt.hasClass("bi-star-fill")) {
    await currentUser.removeFavorite(story);
    $tgt.closest("i").toggleClass("bi-star-fill bi star");
  } else {
    await currentUser.addFavorite(story);
    $tgt.closest("i").toggleClass("bi-star bi-star-fill");
  }
}

$storiesList.on("click", ".star", toggleStoryFavorite);
//Create function to add new stories




$("#submit-form").on("submit", userSubmitStory);
 

