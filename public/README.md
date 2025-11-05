# Simple News - A Vanilla JS News Application

## Overview

Simple News is a clean and straightforward news web application built entirely with HTML, CSS, and vanilla JavaScript. It fetches and displays the latest headlines from around the world using the [News API](https://newsapi.org/). The project was created to demonstrate how to work with external APIs, handle asynchronous JavaScript (Fetch API), and dynamically create HTML elements to build a functional front-end application.

---

## Features

* **Top Headlines:** Fetches and displays the latest top headlines upon loading.
* **Search Functionality:** Allows users to search for news on any topic.
* **Responsive Design:** The user interface is designed to be usable on various screen sizes, from desktops to mobile phones.
* **Dynamic Content:** News cards are generated dynamically using data fetched from the API.

---

## Tech Stack

This project is built with fundamental web technologies and does not use any frameworks.

* **HTML5:** For the basic structure and layout of the application.
* **CSS3:** For styling the user interface and ensuring responsiveness.
* **Vanilla JavaScript (ES6+):** For all the application logic, including:
    * Fetching data from the News API using the `fetch()` method.
    * Handling asynchronous operations with `async/await`.
    * Manipulating the DOM to display the news articles.
* **News API:** The external service used as the source for all news data.

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need a free API key from [News API](https://newsapi.org/register). The process is quick and simple.

### Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/Kuldeepagrahari/News-Hub.git](https://github.com/Kuldeepagrahari/News-Hub.git)
    ```
2.  **Navigate to the project directory**
    ```sh
    cd News-Hub
    ```
3.  **Add your API Key**
    * Open the `script.js` file.
    * Find the placeholder variable for the API key (e.g., `const API_KEY = 'YOUR_API_KEY_HERE';`).
    * Replace `'YOUR_API_KEY_HERE'` with your actual key from the News API website.

4.  **Run the application**
    * Simply open the `index.html` file in your favorite web browser. No server is needed!

---

## Acknowledgments

* This project is powered by the [News API](https://newsapi.org/).
