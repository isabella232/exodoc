# List the document target here, use pdf suffixes.
PDF_TARGET=exosense_server_manual.pdf
HTML_TARGET=$(PDF_TARGET:.pdf=.html)

# List all png files to be generated from msc sources here.
PNG_TARGET=json_rpc_general_flow.png device_transaction.png \
	device_group_transaction.png

MSCGEN=mscgen
MARKDOWN=../tools/peg-multimarkdown-3.7.1/multimarkdown
HTML2PDF=wkhtmltopdf

.PHONY: html pdf all

html:  $(HTML_TARGET)

pdf: $(PDF_TARGET)

$(PDF_TARGET): $(HTML_TARGET)

$(HTML_TARGET): $(PNG_TARGET) $(TARGET:.pdf=.mdown)

%.html: %.mdown
	$(MARKDOWN) -b $<

%.pdf: %.html
	$(HTML2PDF) $< $@

%.png: %.msc
	$(MSCGEN) -T png $<

clean:
	rm -f $(TARGET) $(TARGET:.pdf=.html) $(PNG_TARGET)

