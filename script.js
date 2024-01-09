function setupDragAndDrop() {
    const dropAreas = document.querySelectorAll('.file-drop-area');

    dropAreas.forEach(area => {
        area.addEventListener('dragover', (event) => {
            event.stopPropagation();
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
            area.classList.add('highlight');
        });

        area.addEventListener('dragleave', (event) => {
            area.classList.remove('highlight');
        });

        area.addEventListener('drop', (event) => {
            event.stopPropagation();
            event.preventDefault();
            area.classList.remove('highlight');
            const files = event.dataTransfer.files;
            handleFiles(files, area);
        });

        area.addEventListener('click', () => {
            area.querySelector('input').click();
        });

        area.querySelector('input').addEventListener('change', (event) => {
            const files = event.target.files;
            handleFiles(files, area);
        });
    });
}

function handleFiles(files, area) {
    let fileList = area.getElementsByClassName('file-list')[0];
    fileList.innerHTML = ''; // Clear the list
    
    Array.from(files).forEach(file => {
        let fileItem = document.createElement('div');
        fileItem.textContent = file.name;
        fileList.appendChild(fileItem);
    });
    if (area.id === 'xml-drop-area') {
        document.getElementById('xmlFileInput').files = files;
    } else if (area.id === 'xslt-drop-area') {
        document.getElementById('xsltFileInput').files = files;
    }
}

document.addEventListener('DOMContentLoaded', setupDragAndDrop);

function processFiles() {
    const xmlFiles = document.getElementById('xmlFileInput').files;
    const xsltFile = document.getElementById('xsltFileInput').files[0];

    if (xmlFiles.length > 0 && xsltFile) {
        // Add "Class Documentation" title only if it's not already there
        if (!document.getElementById('class-doc-header')) {
            const header = document.createElement('h1');
            header.textContent = 'Class Documentation';
            header.id = 'class-doc-header'; // Add an ID to ensure we don't add it again
            document.getElementById('output').prepend(header);
        }

        const xsltReader = new FileReader();
        xsltReader.onload = function(e) {
            const xsltContent = e.target.result;
            Array.from(xmlFiles).forEach((xmlFile, index) => {
                processFile(xmlFile, xsltContent);
            });
        };
        xsltReader.readAsText(xsltFile);
    } else {
        alert("Please select XML files and an XSLT file.");
    }
}


function processFile(xmlFile, xsltContent) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const xmlContent = e.target.result;
        transformXML(xmlContent, xsltContent);
    };
    reader.readAsText(xmlFile);
}

function transformXML(xmlContent, xsltContent) {
    document.getElementById('output-placeholder').style.display = 'none';

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
    const xsltDoc = parser.parseFromString(xsltContent, 'text/xml');

    const xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsltDoc);

    const resultDocument = xsltProcessor.transformToDocument(xmlDoc);
    const iframe = document.createElement('iframe');
    iframe.className = 'dynamic-iframe';
    document.getElementById('output').appendChild(iframe);

    iframe.onload = function() {
        // Adjust the height of the iframe based on its content
        setTimeout(() => { // Timeout for content to render
            const body = iframe.contentWindow.document.body;
            const html = iframe.contentWindow.document.documentElement;
            const height = Math.max(body.scrollHeight, body.offsetHeight,
                                   html.clientHeight, html.scrollHeight, html.offsetHeight);
            iframe.style.height = height + 'px';
            updateContainerHeight(); // Call to update the container height
        }, 0);
    };

    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(new XMLSerializer().serializeToString(resultDocument));
    iframe.contentWindow.document.close();
}

function updateContainerHeight() {
    const outputDiv = document.getElementById('output');
    const iframes = outputDiv.getElementsByTagName('iframe');
    let newHeight = 0;
    for (let iframe of iframes) {
        newHeight += iframe.getBoundingClientRect().height;
    }
    // Account for any additional padding/margins
    newHeight += (iframes.length * 20); // Example: 20px margin for each iframe
    outputDiv.style.height = `${newHeight}px`;
}

function exportAsHTML() {
    var cssStyles = document.querySelector('style').textContent; // Get the CSS from the <style> element

    // Get the content and inline styles from the iframes
    var iframeContents = Array.from(document.querySelectorAll('.dynamic-iframe')).map(function(iframe) {
        var styleContent = Array.from(iframe.contentDocument.querySelectorAll('style')).map(style => style.textContent).join(' ');
        var bodyContent = iframe.contentDocument.body.innerHTML;

        // Return a concatenation of the style tags and body content
        return `<style>${styleContent}</style>${bodyContent}`;
    }).join('');

    var fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Exported Output</title>
            <style>
                ${cssStyles}
            </style>
        </head>
        <body>
            ${iframeContents}
        </body>
        </html>
    `;

    var blob = new Blob([fullHtml], { type: 'text/html' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'output.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportAsPDF() {
    // Get the CSS from the main document
    var cssStyles = document.querySelector('style').textContent;

    // Get the content and inline styles from the iframes
    var iframeContents = Array.from(document.querySelectorAll('.dynamic-iframe')).map(function(iframe) {
        var styleContent = Array.from(iframe.contentDocument.querySelectorAll('style')).map(style => style.textContent).join(' ');
        var bodyContent = iframe.contentDocument.body.innerHTML;
        return `<style>${styleContent}</style>${bodyContent}`;
    }).join('');

    // Construct a full HTML string with all styles and contents
    var fullHtmlContent = `<div><style>${cssStyles}</style>${iframeContents}</div>`;

    // Use html2pdf to convert the HTML content to a PDF
    html2pdf().from(fullHtmlContent).set({
        margin: 1,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).save();
}









