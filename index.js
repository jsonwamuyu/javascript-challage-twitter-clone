// Fetch users and populate the select box
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    const userSelect = document.getElementById('userSelect');
    users.forEach(user => {
      const option = document.createElement('option');
      option.value = user.id;
      option.textContent = user.username;
      userSelect.appendChild(option);
    });

    // Set default user (ID 1)
    userSelect.value = 1;
    loadPosts(1); // Load posts for user ID 1 by default
  })
  .catch(error => console.error('Error fetching users:', error));



  // Load posts when a user is selected
document.getElementById('userSelect').addEventListener('change', (event) => {
    const userId = event.target.value;
    loadPosts(userId);
  });
  
  function loadPosts(userId) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(posts => {
        const postContainer = document.getElementById('postContainer');
        postContainer.innerHTML = ''; // Clear previous posts
        posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.textContent = post.title;
          postElement.classList.add('post');
          postElement.addEventListener('click', () => loadComments(post.id)); // Add click event to load comments
          postContainer.appendChild(postElement);
        });
      })
      .catch(error => console.error('Error fetching posts:', error));
  }

  
  function loadComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(response => response.json())
      .then(comments => {
        const commentContainer = document.getElementById('commentContainer');
        commentContainer.innerHTML = ''; // Clear previous comments
        comments.forEach(comment => {
          const commentElement = document.createElement('div');
          commentElement.textContent = comment.body;
          commentElement.classList.add('comment');
          commentContainer.appendChild(commentElement);
        });
      })
      .catch(error => console.error('Error fetching comments:', error));
  }
  