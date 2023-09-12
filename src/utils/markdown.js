const BOLD = 'bold'
const ITALIC = 'italic'
const HEADING = 'heading'
const UNDERLINE = 'underline'
const allToolBar = [BOLD, ITALIC, UNDERLINE, HEADING]

export class MarkDown {
	constructor({id, data = null, toolbar = allToolBar}) {
		this.id = id
		this.data = data
		this.toolbar = toolbar
		this.editor = null
		this.mainEditorSection = null
		this.selectedContent = ''
	}

	init() {
		return new Promise(async (resolve, reject) => {
			this.editor = document.getElementById(this.id)
			
			if (!this.editor) reject('Unable to initialize editor. Elelemt not found.')

			this.editor.classList.add('markdown-editor')
			
			// tools
			const tools = await this.buildToolBar()
			const toolBoxHolder = document.createElement('div')
			toolBoxHolder.classList.add('markdown-tool-box-holder')
			toolBoxHolder.appendChild(tools)
			this.editor.appendChild(toolBoxHolder)

			// main editable section
			this.mainEditorSection = document.createElement('div')
			this.mainEditorSection.classList.add('markdown-main-editable-section')
			this.mainEditorSection.contentEditable = true
			this.mainEditorSection.addEventListener('mouseup', this.beginContentSelection.bind(this))
			this.mainEditorSection.addEventListener('keyup', this.beginContentSelection.bind(this))
			this.editor.appendChild(this.mainEditorSection)

			resolve(true)
		})
	}

	buildToolBar() {
		return new Promise((resolve,) => {
			const toolHolder = document.createElement('div')
			toolHolder.classList.add('tool-boxes')
			
			this.toolbar.map((tool) => {
				const ele = document.createElement('button')
				ele.classList.add('toolbox-btn')
				toolHolder.appendChild(ele)
				switch(tool) {
					case BOLD:
						ele.innerHTML = 'B'
						ele.addEventListener('click', this.bold)
						break
					case ITALIC:
						ele.innerHTML = 'I'
						ele.addEventListener('click', this.italic)
						break
					case UNDERLINE:
						ele.innerHTML = 'U'
						ele.addEventListener('click', this.underline)
						break
					case HEADING:
						ele.innerHTML = 'H'
						ele.addEventListener('click', this.heading)
						break
				}
			})

			resolve(toolHolder)
		})
	}

	beginContentSelection(event) {
		this.selectedContent = this.getHTMLOfSelection()
		// console.log(this.selectedContent)
	}

	bold() {
		if (this.classList.contains('checked')) {

		} else {

		}
		this.classList.toggle('checked')
	}
	italic() {
		if (this.classList.contains('checked')) {

		} else {
			
		}
		this.classList.toggle('checked')
	}
	underline() {
		if (this.classList.contains('checked')) {

		} else {
			
		}
		this.classList.toggle('checked')
	}
	heading() {
		if (this.classList.contains('checked')) {

		} else {
			
		}
		this.classList.toggle('checked')
	}

	getHTMLOfSelection () {
		if (document.selection && document.selection.createRange) {
			const range = document.selection.createRange()
			return range.htmlText
		}
		else if (window.getSelection) {
			let selection = window.getSelection()
			if (selection.rangeCount > 0) {
				const range = selection.getRangeAt(0)
				const clonedSelection = range.cloneContents()
				const div = document.createElement('div')
				div.appendChild(clonedSelection)
				return div.innerHTML
			}
			else {
				return ''
			}
		}
		else {
			return ''
		}
	}

	isSelectionBold() {
		let sel;
		if (window.getSelection) { 
			sel = window.getSelection(); 
		} 
		else if (document.getSelection) { 
			sel = document.getSelection(); 
		}
		
		let raw_html = this.getSelectionAsHtml();
		
		// This is if nothing is selected
		if(raw_html==="") return false;
	
		let tempDiv = document.createElement('div');
		tempDiv.innerHTML = raw_html;
			
		let is_bold_nodes = []
		for (let node of tempDiv.childNodes) {
			let tags = [node.nodeName.toLowerCase()];
					
			// This covers selection that are inside bolded characters
			while(tags.includes("#text")) {
				let start_tag = sel.anchorNode.parentNode.nodeName.toLowerCase();
				let end_tag = sel.focusNode.parentNode.nodeName.toLowerCase();
				tags = [start_tag, end_tag]
			}

			is_bold_nodes.push(this.containsOnly(['strong', 'b'], tags));
		}
		
		return (! is_bold_nodes.includes(false))
	}
	getSelectionAsHtml() {
		let html = "";
		if (typeof window.getSelection != "undefined") {
			let sel = window.getSelection();
			if (sel.rangeCount) {
				let container = document.createElement("div");
				for (let i = 0, len = sel.rangeCount; i < len; ++i) {
					container.appendChild(sel.getRangeAt(i).cloneContents());
				}
				html = container.innerHTML;
			}
		} else if (typeof document.selection != "undefined") {
			if (document.selection.type == "Text") {
				html = document.selection.createRange().htmlText;
			}
		}
		return html;
	}
	containsOnly(array1, array2){
		return !array2.some(elem => !array1.includes(elem))
	}
}