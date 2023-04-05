# D3.js WebGL 10 Million Scatter Plot

This project demonstrates a scatter plot web application using D3.js and WebGL with the REGL library. It allows users to visualize up to 10e6 points plotted simultaneously. The application includes features such as panning, zooming, and a slider to set the number of random points displayed.

## Installation

1. Clone the repository to your local machine.
git clone https://github.com/tdesmedt-tdsgn/10MScatterPlot.git


2. Change directory into the project folder.
cd 10MScatterPlot


3. Start a local web server to serve the files. For example, using Python's built-in HTTP server:
python3 -m http.server 8000

## Usage

1. Open your web browser and navigate to `http://localhost:8000` or the corresponding address where the local server is running.

2. Use the slider to adjust the number of random points to be plotted on the scatter plot.

3. Click and drag the scatter plot to pan, and use the mouse wheel to zoom in and out.

## Libraries

This project uses the following libraries:

- [D3.js](https://d3js.org/) for data manipulation and handling user interactions.
- [REGL](https://github.com/regl-project/regl) for efficient WebGL rendering.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

