# Election Analysis Website

Welcome to the Election Analysis Website project! This guide will help you set up and run the website locally on your machine.

## Getting Started

### Prerequisites
- Python 3.8 or higher

## Development Mode

### Installation

**Using Git:**
```bash
git clone https://github.com/random-goose/elections_2024
````

**Without Git:**

* Navigate to the GitHub repository's Downloads section.
* Click on "Download ZIP."
* Locate the ZIP file on your system and unzip it.

#### Python and Flask

Ensure Python is installed on your system, then install the dependencies:

```bash
python --version            # Should return Python >= 3.8
pip install -r requirements.txt
```

If Python is not installed, visit the [Python download page](https://www.python.org/) and follow the instructions.

#### Node.js and npm

**With sudo access:**

* **Download Node.js**: Visit the [Node.js download page](https://nodejs.org/) and download the LTS version for your OS.

* **Install Node.js**: Follow the appropriate installation instructions:

  * **Windows/macOS**:

    * Run the installer and follow the prompts.
    * Verify installation:

      ```bash
      node -v
      npm -v
      ```
  * **Linux** (Ubuntu-based):

    ```bash
    sudo apt update
    sudo apt install nodejs npm
    node -v
    npm -v
    ```

### Running

#### Prerequisites

* We recommend using an IDE like VSCode: [Download VSCode](https://code.visualstudio.com/download)
* Each section (Frontend, Backend, Framing, Political Ads) runs in its own terminal.
* In VSCode, open a terminal using <kbd>Ctrl</kbd> + <kbd>\`</kbd> or the bottom panel toggle.
* Use the `+` button in the terminal panel to open multiple terminals as needed.

#### Flask Backend

Navigate to the Flask backend folder and start the server:

```bash
cd backend/flask
python app.py
```

#### Express.js Backend

Install required packages:

```bash
sudo npm install -g express nodemon
```

Start the Express.js server:

```bash
cd backend
npm install
nodemon app.js
```

#### Setting the Express.js API URL

Before running the Next.js server, set the `NEXT_PUBLIC_EXPRESS_API_URL` environment variable in a `.env` file at the root of your Next.js project:

```env
NEXT_PUBLIC_EXPRESS_API_URL=http://localhost:3500  # Default port
```

#### Next.js Frontend

Navigate to the frontend directory, install dependencies, and start the server:

```bash
cd election
npm install
npm run dev
```

#### Starting Servers

Ensure all servers are running:

* **Flask Backend**

  ```bash
  cd backend/flask
  python app.py
  ```

* **Express.js Backend**

  ```bash
  cd backend
  nodemon app.js
  ```

* **Framing Flask Backend**

  ```bash
  cd Flask
  python api.py
  ```

#### Political Ads API Setup

Two separate Flask servers handle political ads data. Though the API uses `GET` requests (generally less secure than `POST`), this is suitable here since it only filters publicly available data.

* **Facebook / Meta Ads**

  ```bash
  cd Facebook-API
  python api.py  # Runs on port 5100
  ```

* **Google Ads**

  ```bash
  cd Google-API
  python api.py  # Runs on port 5050
  ```

Ad data is stored in each folder under:

* `meta_ad_data.csv`
* `google_ad_data.csv`

## Production Mode

### Installation

Ensure all development dependencies are installed.

#### Building Next.js for Production

```bash
cd election
npm run build
```

Then, start all servers as described in the Development Mode section.

## Appendices

Some features are not directly accessible via the dashboard. Use the following resources for extended functionality:

* **Quora Community Graphs**: [Link](https://drive.google.com/file/d/1XME3z-NQaNnurI2xD-sq32MTESkSNP5M/view?usp=sharing)
* **Sharechat Community Graphs**: [Link](https://drive.google.com/drive/folders/1KG1MV4sjVjtfVC9QcF4FbwXpjKWTxD0m?usp=sharing)
* **Community Detection Codes**: [Link](https://drive.google.com/drive/folders/1gGEQbm3MrpSum6VmWD8J9ej0_SVniu6h?usp=sharing)
* **Framing Model**: [Link](https://drive.google.com/drive/folders/1ZEnjlKUqVf4ckPNx9vPY6RGJkrX0BDP1?usp=sharing)
* **Toxic Memes Model**: [Link](https://drive.google.com/drive/folders/1LbUsGP0SzYCXTMphgiKB_nHl6SZoU5ZO?usp=sharing)

## Troubleshooting

If you face any issues, please raise an issue in the repository.

### Common Errors

If `npm run dev` returns:

```
> election@0.1.0 dev
> next dev
========================================================================
Welcome to nmh version 1.8
See the release notes in /usr/share/doc/nmh/NEWS
...
next: usage: next [+folder] [switches] [switches for showproc]
```

Try the following:

```bash
npx next dev
npm run dev
```

This usually happens only during the first startup.