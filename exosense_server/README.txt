Exosense Documentation Build System 
-----------------------------------

The Exosense Documentation is divided into four parts.

* Exosense Server Operations Manual
Contains the high level description of the system and how to operate it.

* Exosense Protocol Plugin Developer's Guide
Contains step-by-step instructions on how to develop a protocol plugin.

* Exosense Protocol Plugin API Reference Manual
Contains the Exosense Server API available to Protocol Plugion Developers

* Exosense JSON-RPC Reference Manual
Documents all JSON-RPC calls that can be made to the Exosense Server



The documentation is markdown based, and is converted by pandoc to PDF
and HTML. The PDF conversion is done by invoking LaTex as an
intermediate step, something done automatically by Pandoc.


---
1. Pandoc 1.10.1 or later must be installed to generate the documentation.
---

Please see http://johnmacfarlane.net/pandoc/installing.html
It is recommended that you install pandoc through the Cabal package
manager, as described in the page above. If you do so, please
substitute the cabal install with the following to ensure that pandoc
is installed where Makefile can find it:

    cabal install --prefix=$PWD/tools pandoc

If pandoc is installed elsewhere, the Makefile PANDOC variable must be
updated to find it.

Please note that latex must be installed as well in order to generate PDF files.

---
2. Mscgen 0.2 or later must be installed in order to generate PNG files from the sequence diagram msc-files.
See http://www.mcternan.me.uk/mscgen/ for details.
---

---
3. [Optional] LibreOffice 3.5 or later must be installed  to edit the odt and odp files
These files contain illustrations used in the Exosense Server Operator
Guide.  Export the illustrations as PNG files with their default size.
---
