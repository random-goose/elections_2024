# Election Analysis Website

Welcome to the Election Analysis Website project! This guide will help you set up and run the website locally on your machine.

## Getting Started

### Prerequisites

- Python 3.8 or higher

## Development Mode

### Installation

#### Python and Flask

Ensure Python is installed on your system:

```bash
$ pip install Flask
$ pip install email  # If not already installed
```

#### Node.js and npm

**With sudo access:**

- **Download Node.js**: Visit the [Node.js download page](https://nodejs.org/) and download the LTS version suitable for your operating system.
- **Install Node.js**: Follow the installation instructions for your operating system:
  - **Windows and macOS**:
    - Run the installer and follow the prompts.
    - Verify the installation by opening a terminal and typing:
      ```bash
      $ node -v
      $ npm -v
      ```
  - **Linux**:
    - Use a package manager to install Node.js. For example, on Ubuntu:
      ```bash
      $ sudo apt update
      $ sudo apt install nodejs npm
      ```
    - Verify the installation by typing:
      ```bash
      $ node -v
      $ npm -v
      ```

**Without sudo access:**

- **Using nvm (Node Version Manager)**:
  - Install nvm by running the following command:
    ```bash
    $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    ```
  - Load nvm into your current shell session:
    ```bash
    $ source ~/.bashrc  # Or ~/.zshrc if using zsh
    ```
  - Install the latest version of Node.js using nvm:
    ```bash
    $ nvm install node
    ```
  - Use the installed version of Node.js:
    ```bash
    $ nvm use node
    ```
  - Verify the installation by typing:
    ```bash
    $ node -v
    $ npm -v
    ```

### Running

#### Flask Backend

Navigate to the Flask backend folder and start the server:

```bash
$ cd backend/flask
$ python app.py
```

#### Express.js Backend

Install required packages:

**With sudo access:**

```bash
$ sudo npm install -g express nodemon
```

**Without sudo access (using nvm):**

```bash
$ npm install -g express nodemon
```

Start the Express.js server using nodemon:

```bash
$ cd backend
$ nodemon app.js
```

#### Next.js Frontend

Navigate to the frontend folder and install dependencies:

**With npm:**

```bash
$ cd election
$ npm install  # Install frontend dependencies
```

**Using yarn (alternative to npm):**

- **With sudo access:**
  ```bash
  $ sudo npm install -g yarn
  ```
- **Without sudo access (using nvm):**
  ```bash
  $ npm install -g yarn
  ```
- **Installing packages with yarn:**
  ```bash
  $ yarn install
  ```

#### Setting the Express.js API URL

Before running the Next.js server, ensure you set the `NEXT_PUBLIC_EXPRESS_API_URL` environment variable to the URL of your Express.js backend. You can set this in a `.env` file at the root of your Next.js project:

```bash
# Create a .env file in the election directory and add the following line
NEXT_PUBLIC_EXPRESS_API_URL=http://localhost:3500  # Replace with your actual Express.js server URL
```

Start the Next.js development server:

**With npm:**

```bash
$ npm run dev
```

**With yarn:**

```bash
$ yarn dev
```

## Production Mode

### Installation

Ensure all necessary dependencies are installed as per development mode.

#### Building Next.js for Production

**With npm:**

```bash
$ cd election
$ npm run build  # Build the production version
```

**With yarn:**

```bash
$ cd election
$ yarn build  # Build the production version
```

### Running
#### Starting Servers

Ensure all servers (Flask, Express.js, Next.js) are running.

##### Setting up servers for Political Ads API
The API for Political Ads Data vizualization is powered using two seperate flask servers for ease of startup. While the system implements API calls using `GET requests` instead of POST requests, this design choice was made deliberately. Although GET requests are generally considered less secure than POST requests, this implementation is appropriate for our use case since the API only accesses and filters publicly available data that end users already have access to.

To set up the servers:

**Facebook / Meta Ads Data:**
```bash
$ cd Facebook-API
$ pip install -r requirements.txt # Installs the required packages for both APIs
$ python api.py # Runs on port 5100
```
**Google Ads Data:**
```bash
$ cd Google-API
$ python api.py # Runs on port 5050
```

The advertising data from both the companies is located in their respective folder's under a csv file named `google_ad_data.csv` and `meta_ad_data.csv`. 

Once the server is up and running, the server processes the request sent from the front-end, and returns a graph with the required data. Some functions of the API allow for easier debugging via POST API calls, which can be performed using a tool like Postman. The POST request returns a JSON Formatted version of the required data.

- **Start Flask backend:**
  ```bash
  $ cd backend/flask
  $ python app.py
  ```

- **Start Express.js backend:**
  ```bash
  $ cd backend
  $ nodemon app.js
  ```

- **Start Next.js frontend:**
  **With npm:**
  ```bash
  $ npm start
  ```
  **With yarn:**
  ```bash
  $ yarn start
  ```

## Troubleshooting

- If you encounter any issues during setup or usage, raise an issue.

### Common Errors

if you encounter
```
> election@0.1.0 dev
> next dev
========================================================================
Welcome to nmh version 1.8
See the release notes in /usr/share/doc/nmh/NEWS
Send bug reports, questions, suggestions, and patches to
nmh-workers@nongnu.org.  That mailing list is relatively quiet, so user
questions are encouraged.  Users are also encouraged to subscribe, and
view the archives, at https://lists.gnu.org/mailman/listinfo/nmh-workers
This message will not be repeated until nmh is next updated.
========================================================================
Press enter to continue:
next: usage: next [+folder] [switches] [switches for showproc]
```
when you pass the command `npm run dev`, try running `npx next dev`, and then `npm run dev` again. (this is prone to happen the first time you boot up the dashboard)