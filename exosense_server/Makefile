# List the document target here, use pdf suffixes.
TARGETS=exosense_server_manual.pdf

# List all png files to be generated from msc sources here.
PNG_TARGETS=json_rpc_general_flow.png device_transaction.png virtual_device_transaction.png

MSCGEN=mscgen
MARKDOWN=multimarkdown
HTML2PDF=wkhtmltopdf

all: $(PNG_TARGETS) $(TARGETS)

$(TARGETS): $(PNG_TARGETS) $(TARGETS:.pdf=.html)

$(TARGETS:.pdf=.html): $(TARGETS:.pdf=.mdown)

%.html: %.mdown
	$(MARKDOWN) -b $<

%.pdf: %.html
	$(HTML2PDF) $< $@

%.png: %.msc
	$(MSCGEN) -T png $<

clean:
	rm -f $(TARGETS) $(TARGETS:.pdf=.html) $(PNG_TARGETS)

