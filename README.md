

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">E2E test for Kong Gateway Service</h3>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
This is an end-to-end demo of testing project for Kong Gateway Service.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Considerations

- Each UI page is represented by a class in cypress/pages, the class provide methods to perform actions in that page. Tests then use these methods whenever they need to interact with the UI of that page. If the UI changes for a page, the tests themselves don’t need to change, only the code within the page object needs to change. Subsequently, all changes to support that new UI are located in one place.
- Test cases are put in cypress/e2e/test_\*.cy.js file under /test/ui_tests/*. There are parameterized tests cases in test_e2e.cy.js.
- Tests can be run using different browsers, or using a headless or headed mode, they are controlled by command defined in package.json.
- After each test run, log files are generated in test-results/test-results.xml. If errors occur, screenshots are also generated in cypress/screenshots folder.
- Step by step screenshots can be seen in generated allure report which is generated from allure-results/* by commmand npx allure generate allure-results and the generated reports are put in allure-report folder and can be opened with browser.
- For a beautiful test report, allure is integrated in GitHub Action, it can be found inhttps://github.com/KimXie1984/kongTestCypress/actions/workflows/pages/pages-build-deployment.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Assumptions

- Cypress and javascript are used for this project
- This is a fast demo with limited number of cases. If there are a lot of cases, and the execution takes very long time, .e.g several hours or more.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Prerequisites
1. Docker installed
2. node.js installed
3. npm installed
4. Cypress installed
5. Allure installed

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation and Run locally
1. Clone the repo
   ```sh
   git clone https://GitHub.com/KimXie1984/kongtest.git
   ```
2. Change to the repo's root directory
3. Bring up Kong Services
   ```sh
   docker-compose up -d
   ```
4. Launch tests
   Run tests in headless mode
   ```sh
   npx cypress run
   ```
   or 
   Run tests in chrome browser
   ```sh
   npm run e2e:chrome
   ```
5. Shutdown Kong Gateway Services
   ```sh
   docker-compose down
   ```
6. Generate Allure Report
   ```sh
   npx allure generate allure-results
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Trade-offs

- The GitHub Action of this repository uses 1 GitHub hosted runner for both setting up the Kong Service under test, and the test execution. In real world, we would separate test execution and product to different machines to avoid failure interference and assure resource usage.
- Kong-Gateway docker-compose.yml can be automatically downloaded from Google Drive for each CI run by using https://github.com/pew-actions/google-drive-download. Currently, this project uses the checked in docker-compose.yml in root directory.
- GitHub Action currently triggers a workflow run by "push" event of this repo. We can have small granularity control detailed conditions on MR such as with specific labels or special comments such as "@test".

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Kim Xie - [@linkedin](https://www.linkedin.com/in/kim-xie-44726a47/) - 58331308@qq.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>
