/* eslint-disable @typescript-eslint/no-var-requires */
import "zone.js"; // Included with Angular CLI.
import { Buffer } from "buffer";
import process from "process";

// IMP START - Bundler Issues

// Asegurar que window.global esté disponible
window.global = window;

// Polyfill para Buffer usando import
global.Buffer = global.Buffer || Buffer;

// Polyfill para process usando import
global.process = global.process || process;

// IMP END - Bundler Issues
