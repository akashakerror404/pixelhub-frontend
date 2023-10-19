import React from 'react';
import logo from '../../../static/about.jpg';
import Customenavbar from '../Navbar/Customenavbar';

function About() {
  return (
    <div>
      <Customenavbar />
      <div className="md:flex mb-4 p-6 shadow-lg">
        <div className="md:w-1/2 bg-gray-400">
          <div className="flex justify-center items-center">
            <img
              className="mx-auto w-full"
              src={logo}
              alt="logo"
            />
          </div>
        </div>
        <div className="md:w-1/2 bg-white mt-6">
          <h2 className="text-2xl font-semibold text-black">About Us</h2>
          <hr />
          <p className="text-black mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam libero id augue varius hendrerit. Fusce efficitur lacus in tellus efficitur, non vehicula lectus convallis. Nulla facilisi. Donec venenatis eros ac eros suscipit facilisis. Proin at lorem velit. Integer sollicitudin, nulla quis cursus ultricies, massa ligula tincidunt nisi, et ultrices metus libero id metus.
          </p>
          <footer className="flex flex-col items-center bg-neutral-200 text-center text-white dark:bg-neutral-600 dark:text-neutral-200">
            <div className="container p-6">
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                <div className="mb-6 lg:mb-0">
                  <img
                    src="https://tecdn.b-cdn.net/img/new/fluid/city/113.webp"
                    className="w-full rounded-md shadow-lg"
                    alt="City 113"
                  />
                </div>
                <div class="mb-6 lg:mb-0">
        <img
          src="https://tecdn.b-cdn.net/img/new/fluid/city/111.webp"
          class="w-full rounded-md shadow-lg" />
      </div>
      <div class="mb-6 lg:mb-0">
        <img
          src="https://tecdn.b-cdn.net/img/new/fluid/city/112.webp"
          class="w-full rounded-md shadow-lg" />
      </div>
      <div class="mb-6 lg:mb-0">
        <img
          src="https://tecdn.b-cdn.net/img/new/fluid/city/114.webp"
          class="w-full rounded-md shadow-lg" />
      </div>
      <div class="mb-6 lg:mb-0">
        <img
          src="https://tecdn.b-cdn.net/img/new/fluid/city/115.webp"
          class="w-full rounded-md shadow-lg" />
      </div>
      <div class="mb-6 lg:mb-0">
        <img
          src="https://tecdn.b-cdn.net/img/new/fluid/city/115.webp"
          class="w-full rounded-md shadow-lg" />
      </div>
                {/* Add similar image elements for other cities */}
              </div>
            </div>

            <div className="w-full bg-neutral-300 p-4 text-center  dark:bg-neutral-700 text-black">
              © 2023 Copyright
              <a className="dark:text-neutral-400" > Pixel Hub</a>
            </div>
          </footer>
          <hr />
          <p className="text-black mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam libero id augue varius hendrerit. Fusce efficitur lacus in tellus efficitur, non vehicula lectus convallis. Nulla facilisi. Donec venenatis eros ac eros suscipit facilisis. Proin at lorem velit. Integer sollicitudin, nulla quis cursus ultricies, massa ligula tincidunt nisi, et ultrices metus libero id metus.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
