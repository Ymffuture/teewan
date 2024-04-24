class SubjectSearchEngine {
    constructor() {
        // Initialize the search engine with an empty index and document storage
        this.index = {}; // Inverted index (keyword to list of document IDs)
        this.documents = {}; // Document storage (document ID to document content)
        this.docIdCounter = 0; // Counter to assign unique document IDs

        // Add example documents in math, physics, and biology
        this.addDocument("Mathematics: Algebra is a branch of mathematics dealing with symbols and the rules for manipulating them.");
        this.addDocument("Physics: Quantum mechanics is a fundamental theory in physics describing the physical properties of nature.");
        this.addDocument("Biology: Photosynthesis is the process by which green plants and some other organisms convert sunlight into energy.");
        this.addDocument("Mathematics: Calculus is the mathematical study of continuous change.");
        this.addDocument("Physics: Thermodynamics is the branch of physics dealing with heat and temperature and their relation to energy and work.");
        this.addDocument("Biology: Genetics is the study of genes, genetic variation, and heredity in living organisms.");
    }

    addDocument(content) {
        // Add a document to the search engine
        this.docIdCounter += 1;
        const docId = this.docIdCounter;

        // Store the document content
        this.documents[docId] = content;

        // Split the content into words and index them
        const words = content.toLowerCase().split(/\W+/);
        words.forEach((word) => {
            if (!this.index[word]) {
                this.index[word] = [];
            }
            // Add the document ID to the list of documents for this word
            if (!this.index[word].includes(docId)) {
                this.index[word].push(docId);
            }
        });

        return docId;
    }

    search(query) {
        // Search for documents containing the given query
        const queryWords = query.toLowerCase().split(/\W+/);
        let matchingDocuments = new Set();

        queryWords.forEach((word, index) => {
            if (this.index[word]) {
                const docIds = this.index[word];
                if (index === 0) {
                    // Initialize matching documents with the document IDs of the first word
                    matchingDocuments = new Set(docIds);
                } else {
                    // Intersect with existing matching documents
                    matchingDocuments = new Set([...matchingDocuments].filter(id => docIds.includes(id)));
                }
            } else {
                // If a word is not in the index, return no results
                return [];
            }
        });

        // Retrieve the matching documents' content
        const results = [];
        matchingDocuments.forEach((docId) => {
            results.push({ docId, content: this.documents[docId] });
        });

        return results;
    }
}

// Create an instance of the search engine
const subjectSearchEngine = new SubjectSearchEngine();

// Function to handle the search action
function search() {
    const query = document.getElementById('query').value;
    const results = subjectSearchEngine.search(query);

    // Display the search results
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length > 0) {
        results.forEach(({ docId, content }) => {
            const resultElement = document.createElement('div');
            resultElement.className = 'result';
            resultElement.innerHTML = `<strong>Document ID:</strong> ${docId}<br><strong>Content:</strong> ${content}`;
            resultsContainer.appendChild(resultElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
}
function Print(){
    window.print();
}




var loader = document.getElementById("loader");
  window.addEventListener("loader", function(){
    loader.style.display = "none";
  })


  window.addEventListener("load", () => {

    const loader = document.querySelector(".loader")

 document.querySelector(".loader").classList.add("loader--hidden"); 
 
 document.querySelector(".loader").addEventListener("transitionend", () => {
  document.body.removeChild(document.querySelector(".loader"));
  setTimeout(loader,5000);

 })

  })


  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const submitButton = document.getElementById('submitButton');

    // Event listener for all inputs
    form.addEventListener('input', () => {
        // Check if the form is valid
        const isValid = form.checkValidity();
        
        // Enable/disable submit button based on form validity
        submitButton.disabled = !isValid;
    });
});