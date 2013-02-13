# List the document target here, use pdf suffixes.
PDF_TARGETS=exosense_reference_manual.pdf exosense_plugin_guide.pdf exosense_operations_guide.pdf exosense_server_manual.pdf 
HTML_TARGETS=$(PDF_TARGETS:.pdf=.html)

# List all png files to be generated from msc sources here.
PNG_TARGETS=json_rpc_general_flow.png device_transaction.png \
	device_group_transaction.png

# Repo to checkout Yang specs from
EXOSENSE_SPEC_REPO=git@github.com:Feuerlabs/exosense_specs.git

# Branch within the repo to use.
EXOSENSE_SPEC_BRANCH=2.0

# Target for the auto-generated yang spec markdown files.
EXOSENSE_SPEC_DIR=./exosense_spec
EXOSENSE_SPEC_TARGET=$(EXOSENSE_SPEC_DIR)/doc/exodm.md
EXOSENSE_SPEC_TOOL_TARGET=$(EXOSENSE_SPEC_DIR)/ebin/exosense_specs.app
EXOSENSE_SPEC_REPO_TARGET=exosense_spec/rebar.config

MSCGEN=mscgen
MARKDOWN=../tools/peg-multimarkdown-3.7.1/multimarkdown
HTML2PDF=wkhtmltopdf

.PHONY: html pdf all pull_spec

html: $(HTML_TARGETS)

pdf: $(PDF_TARGETS)

$(PDF_TARGETS): $(HTML_TARGETS)

$(HTML_TARGETS): $(PNG_TARGETS) $(TARGETS:.pdf=.mdown)

%.html: %.mdown
	$(MARKDOWN) -b $<

%.pdf: %.html
	$(HTML2PDF) $< $@

%.png: %.msc
	$(MSCGEN) -T png $<

clean: spec_clean
	rm -f $(PDF_TARGETS) $(PDF_TARGETS:.pdf=.html) $(PNG_TARGETS)

spec_pull: spec_clean
	(cd $(EXOSENSE_SPEC_DIR); git pull)

$(HTML_TARGETS): $(EXOSENSE_SPEC_TARGET) 

$(EXOSENSE_SPEC_TARGET): $(EXOSENSE_SPEC_TOOL_TARGET)
	(cd $(EXOSENSE_SPEC_DIR); make doc)
	cat exosense_reference_manual_header.mdown $(EXOSENSE_SPEC_TARGET) > ./exosense_reference_manual.mdown

$(EXOSENSE_SPEC_TOOL_TARGET): $(EXOSENSE_SPEC_REPO_TARGET)
	(cd $(EXOSENSE_SPEC_DIR); make)

$(EXOSENSE_SPEC_REPO_TARGET):
	git clone -b $(EXOSENSE_SPEC_BRANCH) $(EXOSENSE_SPEC_REPO) $(EXOSENSE_SPEC_DIR)

spec_spotless:
	rm -rf $(EXOSENSE_SPEC_DIR)

spec_clean:
	rm -rf $(EXOSENSE_SPEC_DIR)/doc/*.md