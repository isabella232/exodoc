# List the document target here, use pdf suffixes.
PDF_TARGETS=exosense_reference_manual.pdf exosense_plugin_guide.pdf exosense_operations_guide.pdf exosense_server_manual.pdf
HTML_TARGETS=$(PDF_TARGETS:.pdf=.html)

# List all png files to be generated from msc sources here.
PNG_TARGETS=json_rpc_general_flow.png device_transaction.png \
	device_group_transaction.png

# Repo to checkout Yang specs from
YANG_SPEC_REPO=git@github.com:Feuerlabs/exosense_specs.git

# Branch within the repo to use.
YANG_SPEC_BRANCH=2.0

# Target for the auto-generated yang spec markdown files.
YANG_SPEC_DIR=./exosense_spec

YANG_SPEC_SOURCE=$(YANG_SPEC_DIR)/yang/exodm.yang \
		$(YANG_SPEC_DIR)/yang/exodm_account.yang \
		$(YANG_SPEC_DIR)/yang/exodm_config_set.yang \
		$(YANG_SPEC_DIR)/yang/exodm_device_group.yang \
		$(YANG_SPEC_DIR)/yang/exodm_device_type.yang \
		$(YANG_SPEC_DIR)/yang/exodm_device.yang \
		$(YANG_SPEC_DIR)/yang/exodm_package.yang \
		$(YANG_SPEC_DIR)/yang/exodm_type.yang \
		$(YANG_SPEC_DIR)/yang/exodm_user.yang \
		$(YANG_SPEC_DIR)/yang/exodm_yang_module.yang \
		$(YANG_SPEC_DIR)/yang/exosense.yang \
		$(YANG_SPEC_DIR)/yang/exodm.yang \
		$(YANG_SPEC_DIR)/yang/ietf-inet-types.yang

YANG_SPEC_TARGET=$(YANG_SPEC_DIR)/doc/exodm.md
YANG_SPEC_TOOL_TARGET=$(YANG_SPEC_DIR)/ebin/exosense_specs.app
YANG_SPEC_REPO_TARGET=exosense_spec/rebar.config

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
	(cd $(YANG_SPEC_DIR); git pull)

$(HTML_TARGETS): $(YANG_SPEC_TARGET)

$(YANG_SPEC_TARGET): $(YANG_SPEC_TOOL_TARGET) $(YANG_SPEC_SOURCE)
	(cd $(YANG_SPEC_DIR); make doc)
	cat exosense_reference_manual_header.mdown $(YANG_SPEC_TARGET) > ./exosense_reference_manual.mdown

$(YANG_SPEC_TOOL_TARGET): $(YANG_SPEC_REPO_TARGET)
	(echo "DOING TOOL TARGET"; cd $(YANG_SPEC_DIR); make)

$(YANG_SPEC_REPO_TARGET):
	git clone -b $(YANG_SPEC_BRANCH) $(YANG_SPEC_REPO) $(YANG_SPEC_DIR)

spec_spotless:
	rm -rf $(YANG_SPEC_DIR)

spec_clean:
	rm -rf $(YANG_SPEC_DIR)/doc/exodm.md