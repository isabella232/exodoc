# List the document target here, use pdf suffixes.
TARGETS=exosense_server.pdf

# List all png files to be generated from msc sources here.
# PNG_TARGETS=exosense_server_image.png
MSCGEN=mscgen
MARKDOWN=multimarkdown
HTML2PDF=wkhtmltopdf

all: $(TARGETS) # $(PNG_TARGETS)

$(TARGETS): $(TARGETS:.pdf=.html)

$(TARGETS:.pdf=.html): $(TARGETS:.pdf=.mdown)

%.html: %.mdown
	$(MARKDOWN) -b $<

%.pdf: %.html
	$(HTML2PDF) $< $@

%.png: %.msc
	$(MSCGEN) -T png $<

clean:
	rm -f $(TARGETS) $(TARGETS:.pdf=.html) $(PNG_TARGETS)
