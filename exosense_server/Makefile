# Edit this path if pandoc 1.10.1 is installed elsewhere. See README.txt for pandoc install instructions.
PANDOC=		$(shell which pandoc || echo ../tools/bin/pandoc)

# Edit this path to point to mscgen 0.20 or later.
MSCGEN=		$(shell which mscgen || echo /usr/bin/mscgen)


# List the document target here, use pdf suffixes.
PDF_TARGETS=	plugin_reference_manual.pdf exosense_reference_manual.pdf \
		exosense_plugin_guide.pdf exosense_operations_guide.pdf \
		exosense_server_manual.pdf exosense_demo_tutorial.pdf


# HTML targets are the same as PDF targets, but with html suffix instead
HTML_TARGETS=	$(PDF_TARGETS:.pdf=.html)
TEX_TARGETS=	$(PDF_TARGETS:.pdf=.tex)

# List all png files to be generated from msc sources here.
PNG_TARGETS=	json_rpc_general_flow.png device_transaction.png \
		device_group_transaction.png

REFERENCE_MANUAL = exosense_reference_manual.mdown
DEMO_TUTORIAL = exosense_demo_tutorial.mdown


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


# Markdown file, copied out from EXODM_PLUGIN_DIR/doc after edown has
# generated the markdown file.
# Special case. Exodm_plugin.pdf is so full of HTML that we'll have to
# run the mdown -> html ->  pdf chain, instead of mdown -> pdf
EXODM_PLUGIN= plugin_reference_manual.mdown


# Repo to checkout Yang specs from
EXODM_PLUGIN_REPO=git@github.com:Feuerlabs/exodm_plugin.git

# Branch within the repo to use.
EXODM_PLUGIN_BRANCH=master

# Target for the auto-generated yang spec markdown files.
EXODM_PLUGIN_DIR=./exodm_plugin


EXODM_PLUGIN_TARGET=$(EXODM_PLUGIN_DIR)/doc/exodm_plugin.md
EXODM_PLUGIN_REPO_TARGET=exodm_plugin/rebar.config

.PHONY: html pdf all deps_pull png clean deps_clean deps_spotless

pdf: $(PNG_TARGETS) $(REFERENCE_MANUAL) $(EXODM_PLUGIN) $(PDF_TARGETS)

tex: $(PNG_TARGETS) $(REFERENCE_MANUAL) $(TEX_TARGETS)

html: $(PANDOC) $(PNG_TARGETS) $(REFERENCE_MANUAL)  $(EXODM_PLUGIN) $(HTML_TARGETS)

png: $(PNG_TARGETS)


$(PNG_TARGETS): %.png: %.msc
	$(MSCGEN) -T png $<

%.pdf: %.mdown  $(PANDOC)
	$(PANDOC)  --template=./pandoc_template.latex --toc -N  -f markdown -o $@ $<

$(DEMO_TUTORIAL:.mdown=.pdf): $(DEMO_TUTORIAL)
	$(PANDOC)  --template=./pandoc_refman_template.latex --toc -N  -f markdown -o $@ $<

$(REFERENCE_MANUAL:.mdown=.pdf): $(REFERENCE_MANUAL)
	$(PANDOC)  --template=./pandoc_refman_template.latex --toc -N  -f markdown -o $@ $<

$(EXODM_PLUGIN:.mdown=.pdf): $(EXODM_PLUGIN)
	$(PANDOC) --standalone --template=./pandoc_template.html5 --css=edown_stylesheet.css  -o $(EXODM_PLUGIN:.mdown=.html) $<
	$(PANDOC) --standalone --toc -N -o $@ $(EXODM_PLUGIN:.mdown=.html)

%.tex: %.mdown  $(PANDOC)
	$(PANDOC)   --toc -N  -f markdown -o $@ $<

%.html: %.mdown  $(PANDOC)
	$(PANDOC)  --template=./pandoc_template.html5 --standalone --toc -N  -f markdown -t html5 -o $@ $<

clean: deps_clean
	rm -f $(PDF_TARGETS) $(PDF_TARGETS:.pdf=.html) $(PNG_TARGETS)

deps_pull: deps_clean
	(cd $(YANG_SPEC_DIR); git pull)
	(cd $(EXODM_PLUGIN_DIR); git pull)

$(REFERENCE_MANUAL):  $(YANG_SPEC_TARGET)
	cat exosense_reference_manual_header.mdown $(YANG_SPEC_TARGET) > $@

$(YANG_SPEC_TARGET): $(YANG_SPEC_TOOL_TARGET) $(YANG_SPEC_SOURCE)
	(cd $(YANG_SPEC_DIR); make doc)

$(YANG_SPEC_TOOL_TARGET): $(YANG_SPEC_REPO_TARGET)
	(cd $(YANG_SPEC_DIR); make)

$(YANG_SPEC_REPO_TARGET):
	git clone -b $(YANG_SPEC_BRANCH) $(YANG_SPEC_REPO) $(YANG_SPEC_DIR)

$(EXODM_PLUGIN):  $(EXODM_PLUGIN_TARGET)
	cat plugin_reference_manual_header.mdown $(EXODM_PLUGIN_TARGET) > $@


$(EXODM_PLUGIN_TARGET): $(EXODM_PLUGIN_REPO_TARGET)
	(cd $(EXODM_PLUGIN_DIR); rebar get-deps compile doc)

$(EXODM_PLUGIN_REPO_TARGET):
	git clone -b $(EXODM_PLUGIN_BRANCH) $(EXODM_PLUGIN_REPO) $(EXODM_PLUGIN_DIR)

deps_spotless: deps_clean
	rm -rf $(YANG_SPEC_DIR)
	rm -rf $(EXODM_PLUGIN_DIR)

deps_clean:
	rm -rf \
	$(YANG_SPEC_TARGET) $(REFERENCE_MANUAL) \
	$(EXODM_PLUGIN_TARGET) $(EXODM_PLUGIN) \
	$(EXODM_PLUGIN:.mdown=.pdf) $(EXODM_PLUGIN:.mdown=.html) 


$(PANDOC):
	@echo "pandoc not found at "$(PANDOC)
	@echo "Please set PANDOC variable in Makefile to point to pandoc 1.10.1 or later."

$(MSCGEN):
	@echo "mscgen not found at "$(MSCGEN)
	@echo "Please set MSCGEN variable in Makefile to point to mscgen 0.20 or later."
