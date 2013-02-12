# List the document target here, use pdf suffixes.
PDF_TARGETS=exodm.pdf exosense_plugin_guide.pdf exosense_operations_guide.pdf exosense_server_manual.pdf 
HTML_TARGETS=$(PDF_TARGETS:.pdf=.html)

# List all png files to be generated from msc sources here.
PNG_TARGETS=json_rpc_general_flow.png device_transaction.png \
	device_group_transaction.png

MSCGEN=mscgen
MARKDOWN=../tools/peg-multimarkdown-3.7.1/multimarkdown
HTML2PDF=wkhtmltopdf

.PHONY: html pdf all

html:  $(HTML_TARGETS)

pdf: $(PDF_TARGETS)

$(PDF_TARGETS): $(HTML_TARGETS)

$(HTML_TARGETS): $(PNG_TARGETS) $(TARGETS:.pdf=.mdown)

%.html: %.mdown
	$(MARKDOWN) -b $<

%.pdf: %.html
	$(HTML2PDF) $< $@

%.png: %.msc
	$(MSCGEN) -T png $<

clean:
	rm -f $(PDF_TARGETS) $(PDF_TARGETS:.pdf=.html) $(PNG_TARGETS)

