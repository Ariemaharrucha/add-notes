# Add-Notes Application

Add-Notes is a simple note-taking application designed to help users organize and manage their tasks, ideas, and others. The application provides a clean and intuitive interface to add, edit, and delete notes. It leverages Supabase for database management and uses Google OAuth for secure user authentication.

## Features

- **Create Notes**: Quickly add new notes with a title and description.
- **Edit Notes**: Update existing notes to keep your information accurate and relevant.
- **Delete Notes**: Remove notes that are no longer needed.
- **Google OAuth Authentication**: Secure login with Google accounts.

## Installation

### Prerequisites

- Node.js
- npm
- Supabase account

### Steps

1. Clone the repository:

   ```bash
   https://github.com/Ariemaharrucha/add-notes.git
   ```

2. Navigate to the project directory:

   ```bash
   cd add-notes
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure environment variables:
   Create a `.env` file in the root directory with the following:

   ```env
   VITE_PROJECT_URL=YOUR_PROJECT_URL
   VITE_SUPABASE_API_KEY=YOUR_SUPABASE_API_KEY
   CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
   ```

5. Start the development server:

   ```bash
   npm start
   ```

6. Open the application in your browser.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Database**: Supabase
- **Authentication**: Google OAuth

## Usage

1. Open the application in your browser.
2. Log in using your Google account.
3. Use the "Add Note" button to create a new note.
4. Click on a note to edit its content.
5. Delete notes by clicking the delete button.

## Contributing

We welcome contributions to improve the Add-Notes application. To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## Contact

For questions or feedback, please reach out:

- **Email**: [arie.maharucha.zakka@gmail.com](mailto:arie.maharucha.zakka@gmail.com)
- **GitHub**: [https://github.com/Ariemaharrucha](https://github.com/Ariemaharrucha)


