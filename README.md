Interactive Map Application
This is a React web application that displays an interactive map with filtering and search capabilities, points on the map, and charts using Chart.js. The application allows users to create new maps automatically by uploading a JSON file with a specified structure.

Features
Interactive Map: Displays points on a map with various regions and localities.
Filters and Search: Allows users to filter points by locality and region and search for specific points.
Dynamic Map Creation: Automatically generates a new map with filters, points, and colors by uploading a JSON file.
Charts: Displays charts using Chart.js to provide visual representation of data.
Context API: Utilizes React's Context API for state management.
Dependencies
The application relies on the following dependencies:

chart.js ^4.4.3: For rendering charts.
dotenv ^16.4.5: For managing environment variables.
leaflet ^1.9.4: For rendering the interactive map.
leaflet.markercluster ^1.5.3: For clustering markers on the map.
react ^18.3.1: The core React library.
react-chartjs-2 ^5.2.0: For integrating Chart.js with React.
react-dom ^18.3.1: For working with the DOM in React.
react-leaflet ^4.2.1: For integrating Leaflet with React.
Installation
To get started with the project, clone the repository and install the dependencies:

bash
Copiar código
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
npm install
Usage
To start the development server, run:

bash
Copiar código
npm start
This will start the application at http://localhost:3000.

How to Use
Interactive Map: The map displays various points with different colors representing different regions.

Filters: Use the dropdown menus to filter points by locality and region.

Search: Use the search bar to find specific points on the map.

Upload JSON: To create a new map, upload a JSON file with the following structure:

json
Copiar código
{
"regions": [
{
"name": "Region 1",
"points": [
{
"name": "Point 1",
"coordinates": [lat, lng],
"locality": "Locality 1",
"color": "color"
},
...
]
},
...
]
}
The application will automatically generate a new map with the specified points, filters, and colors.

Screenshots

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contributing
If you would like to contribute to the project, please fork the repository and submit a pull request.

Contact
For any questions or inquiries, please contact your-email@example.com.

Feel free to customize this README according to your specific needs and repository details. Make sure to replace path-to-your-screenshot.png with the actual path to your screenshot file.
