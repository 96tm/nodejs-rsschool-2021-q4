Ciphering CLI Tool <br>

<details>
   
  <summary>
      Description
  </summary>
  
   Encodes/decodes English letters, leaves other symbols unchanged. <br>
   
 </details>
 
 <details>
   
   <summary>
      Installation
   </summary>
   
   - clone the repository
   ```sh
   $ git clone https://github.com/96tm/nodejs-rsschool-2021-q4
   ```
   - go to the created directory
   ```sh
   $ cd nodejs-rsschool-2021-q4
   ```
   - switch to the development branch
   ```sh
   $ git switch ciphering-cli-tool
   ```
   To run the program you have to have `node.js` installed (version `16.13.0` or later). <br>
   
   </details>
   
   <details>
   
   <summary>
      Usage
   </summary>
   
   To encode/decode text in file input.txt and write the result into output.txt run the following command:
   ```sh
   $ node my_caesar_cli -c A-C1-C1 -i input.txt -o output.txt
   ```
   To encode/decode text from stdin and write it into output.txt run
   ```sh
   $ node my_caesar_cli -c A-C1-C1 -o output.txt
   ```
   To encode/decode text from file input.txt and write it into stdout run
   ```sh
   $ node my_caesar_cli -c A-C1-C1 -i input.txt
   ```
   To encode/decode text from stdin and write the result into stdout run
   ```sh
   $ node my_caesar_cli -c A-C1-C1
   ```
   If input is being read from stdin, press `Ctrl-D` or `Ctrl-C` to exit.
   
   </details>
   
   <details>
   
   <summary>
      Options: <br>
   </summary>
   
   `-c, --config`: 'A' for using Atbash cipher, 'C' for Caesar cipher, 'R' for ROT-8 cipher; <br> <i> 'C' and 'R' must be followed by '1' for encoding and '0' for decoding </i> <br>
   `-i, --input`: name of a text file to encode (must have utf-8 encoding); <br> <i> if no input filename provided, input is read from stdin </i> <br>
   `-o, --output`: name of a text file where the transformed text will be written; <br> <i> if output filename provided, output is written into stdout </i> <br>
  </details>
