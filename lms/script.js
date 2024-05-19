document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const logoutForm = document.getElementById('logout-form');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const username = formData.get('username');
        const password = formData.get('password');
        const email = formData.get('email');
        const full_name = formData.get('full_name');
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, email, full_name })
            });
            if (response.ok) {
                alert('Registration successful');
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            if (response.ok) {
                alert('Login successful');
                showLoggedInState();
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    logoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/logout', {
                method: 'POST'
            });
            if (response.ok) {
                alert('Logout successful');
                showLoggedOutState();
            } else {
                alert('Logout failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Check if the user is logged in
    checkLoginStatus();
});

function showLoggedInState() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('logout-form').style.display = 'block';
    document.getElementById('course-selection').style.display = 'block';
    fetchCourses();
    fetchSelectedCourses();
}

function showLoggedOutState() {
    document.getElementById('logout-form').style.display = 'none';
    document.getElementById('course-selection').style.display = 'none';
    document.getElementById('selected-courses').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'block';
}

function checkLoginStatus() {
    fetch('/check-login')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                showLoggedInState();
            } else {
                showLoggedOutState();
            }
        })
        .catch(error => {
            console.error('Error checking login status:', error);
        });
}

function fetchCourses() {
    fetch('/courses')
        .then(response => response.json())
        .then(courses => {
            const coursesDiv = document.getElementById('courses');
            coursesDiv.innerHTML = '';
            courses.forEach(course => {
                const courseElement = document.createElement('div');
                courseElement.innerText = course.name;
                const selectButton = document.createElement('button');
                selectButton.innerText = 'Select';
                selectButton.addEventListener('click', () => selectCourse(course.id));
                courseElement.appendChild(selectButton);
                coursesDiv.appendChild(courseElement);
            });
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
        });
}

function selectCourse(courseId) {
    fetch('/select-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId })
    })
    .then(response => {
        if (response.ok) {
            alert('Course selected successfully');
            fetchSelectedCourses();
        } else {
            throw new Error('Failed to select course');
        }
    })
    .catch(error => {
        console.error('Error selecting course:', error);
    });
}

function fetchSelectedCourses() {
    fetch('/selected-courses')
        .then(response => response.json())
        .then(courses => {
            const selectedCoursesDiv = document.getElementById('selected-courses-list');
            selectedCoursesDiv.innerHTML = '';
            courses.forEach(course => {
                const courseElement = document.createElement('div');
                courseElement.innerText = course.name;
                selectedCoursesDiv.appendChild(courseElement);
            });
            document.getElementById('selected-courses').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching selected courses:', error);
        });
}

function fetchCourseContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    fetch(`/course/${courseId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayCourseContent(data);
        })
        .catch(error => {
            console.error('Error fetching course content:', error);
        });
}

function displayCourseContent(courseContent) {
    const courseNameElement = document.getElementById('course-name');
    courseNameElement.textContent = courseContent.name;

    const courseContentElement = document.getElementById('course-content');
    courseContentElement.innerHTML = '';

    courseContent.modules.forEach(module => {
        const moduleSection = document.createElement('section');
        moduleSection.innerHTML = `
            <h2>${module.title}</h2>
            <p>${module.description}</p>
        `;
        courseContentElement.appendChild(moduleSection);
    });
}

function fetchLeaderboardData() {
    fetch('/leaderboard')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayLeaderboardData(data);
        })
        .catch(error => {
            console.error('Error fetching leaderboard data:', error);
        });
}

function displayLeaderboardData(leaderboardData) {
    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = '';

    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
        </tr>
    `;

    leaderboardData.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.score}</td>
        `;
        table.appendChild(row);
    });

    leaderboardElement.appendChild(table);
}

function fetchFullName() {
    fetch('/get-fullname')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayFullName(data.fullName);
        })
        .catch(error => {
            console.error('Error fetching user full name:', error);
        });
}

function displayFullName(fullName) {
    const fullNameElement = document.getElementById('user-fullname');
    fullNameElement.textContent = fullName;
}
