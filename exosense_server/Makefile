# Edit this path if pandoc 1.10.1 is installed elsewhere. See README.txt for pandoc install instructions.
PANDOC=		../tools/bin/pandoc

# Edit this path to point to mscgen 0.20 or later.
MSCGEN=		/usr/bin/mscgen

# List the document target here, use pdf suffixes.
PDF_TARGETS=	exosense_reference_manual.pdf exosense_plugin_guide.pdf \
		exosense_operations_guide.pdf exosense_server_manual.pdf

# HTML targets are the same as PDF targets, but with html suffix instead
HTML_TARGETS=	$(PDF_TARGETS:.pdf=.html)
TEX_TARGETS=	$(PDF_TARGETS:.pdf=.tex)

# List all png files to be generated from msc sources here.
PNG_TARGETS=	json_rpc_general_flow.png device_transaction.png \
		device_group_transaction.png

REFERENCE_MANUAL = exosense_reference_manual.mdown 

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


.PHONY: html pdf all pull_spec png

pdf: $(PNG_TARGETS) $(REFERENCE_MANUAL) $(PDF_TARGETS)

tex: $(PNG_TARGETS) $(REFERENCE_MANUAL) $(TEX_TARGETS)

html: $(PANDOC) $(PNG_TARGETS) $(REFERENCE_MANUAL) $(HTML_TARGETS)

png: $(PNG_TARGETS)


$(PNG_TARGETS): %.png: %.msc
	$(MSCGEN) -T png $<

%.pdf: %.mdown  $(PANDOC) 
	$(PANDOC)  --template=./pandoc_template.latex --toc -N  -f markdown -o $@ $<

%.tex: %.mdown  $(PANDOC) 
	$(PANDOC)   --toc -N  -f markdown -o $@ $<

%.html: %.mdown  $(PANDOC) 
	$(PANDOC)  --template=./pandoc_template.html5 --standalone --toc -N  -f markdown -t html5 -o $@ $<

clean: spec_clean
	rm -f $(PDF_TARGETS) $(PDF_TARGETS:.pdf=.html) $(PNG_TARGETS)

spec_pull: spec_clean
	(cd $(YANG_SPEC_DIR); git pull)

$(REFERENCE_MANUAL):  $(YANG_SPEC_TARGET)
	cat exosense_reference_manual_header.mdown $(YANG_SPEC_TARGET) > ./exosense_reference_manual.mdown

$(YANG_SPEC_TARGET): $(YANG_SPEC_TOOL_TARGET) $(YANG_SPEC_SOURCE)
	(cd $(YANG_SPEC_DIR); make doc)

$(YANG_SPEC_TOOL_TARGET): $(YANG_SPEC_REPO_TARGET)
	(echo "DOING TOOL TARGET"; cd $(YANG_SPEC_DIR); make)

$(YANG_SPEC_REPO_TARGET):
	git clone -b $(YANG_SPEC_BRANCH) $(YANG_SPEC_REPO) $(YANG_SPEC_DIR)

spec_spotless:
	rm -rf $(YANG_SPEC_DIR)

spec_clean:
	rm -rf $(YANG_SPEC_DIR)/doc/exodm.md exosense_reference_manual.mdown


$(PANDOC):
	@echo "pandoc not found at "$(PANDOC)
	@echo "Please set PANDOC variable in Makefile to point to pandoc 1.10.1 or later."

$(MSCGEN):
	@echo "mscgen not found at "$(MSCGEN)
	@echo "Please set MSCGEN variable in Makefile to point to mscgen 0.20 or later."
