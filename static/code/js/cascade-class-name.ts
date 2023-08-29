export async function cascadeClassName(element: Element) {
    // Add the 'Active' class to the current element
    element.classList.add('Active');

    // Create a copy of child nodes to avoid infinite loop
    const children = Array.from(element.childNodes);

    // Iterate over all children of the current element
    for (const child of children) {
        if (child.nodeType === Node.ELEMENT_NODE) {
            // If child is an element node, call the function recursively
            await new Promise(resolve => setTimeout(resolve, 1000 / 16));
            await cascadeClassName(child as Element);
        } else if (child.nodeType === Node.TEXT_NODE && child.nodeValue?.trim()) {
            // If child is a non-empty text node, replace it with a series of span elements
            const text = (child as Text).data;
            const parent = child.parentNode!;
            // Set textContent of child to empty string to hide original text
            child.textContent = '';
            for (const char of text.split('')) {
                if (char === ' ') {
                    parent.insertAdjacentHTML('beforeend', '&nbsp;');
                } else {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.className = 'Active';
                    parent.appendChild(span);
                }
                await new Promise(resolve => setTimeout(resolve, 1000 / 16));
            }
            parent.removeChild(child);
        }
    }
}

// // Usage example
// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('button')?.addEventListener('click', async () => {
//         const parentElement = document.getElementById('parentElementId');
//         if (parentElement) {
//             await cascadeClassName(parentElement);
//         }
//     });
// });
