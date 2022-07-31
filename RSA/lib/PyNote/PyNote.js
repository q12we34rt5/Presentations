(function (global, factory) {
    global.PyNote = factory();
    global.PyNote.then(PyNote => {
        global.PyNote = PyNote;
    });
}(this, (async function () {
    'use strict';

    async function loadLibrary(libs) {
        for (const str of libs.split('\n')) {
            if (str.length === 0) continue;
            const tag = str.matchAll(/<([a-z]+)/g);
            const attrs = str.matchAll(/([a-z]+)="(.*?)"/g);

            const elem = document.createElement(tag.next().value[1]);
            for (const attr of attrs) {
                elem.setAttribute(attr[1], attr[2]);
            }
            document.head.appendChild(elem);

            await new Promise((resolve, reject) => {
                elem.addEventListener('load', () => {
                    resolve();
                });
            });
        }
        return;
    }

    function parseElement(html) {
        let htmlContainer = document.createElement('html');
        htmlContainer.innerHTML = html;
        return htmlContainer.childNodes[1].childNodes[0];
    }

    // load font
    await loadLibrary(`<link href="http://fonts.cdnfonts.com/css/alliance-no1" rel="stylesheet">`);
    // load pyodide
    await loadLibrary(`<script src="https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js"></script>`);
    // load codemirror
    await loadLibrary(`<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.js" integrity="sha512-8RnEqURPUc5aqFEN04aQEiPlSAdE0jlFS/9iGgUyNtwFnSKCXhmB6ZTNl7LnDtDWKabJIASzXrzD0K+LYexU9g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/keymap/sublime.min.js" integrity="sha512-SV3qeFFtzcmGtUQPLM7HLy/7GKJ/x3c2PdiF5GZQnbHzIlI2q7r77y0IgLLbBDeHiNfCSBYDQt898Xp0tcZOeA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/comment/comment.min.js" integrity="sha512-UaJ8Lcadz5cc5mkWmdU8cJr0wMn7d8AZX5A24IqVGUd1MZzPJTq9dLLW6I102iljTcdB39YvVcCgBhM0raGAZQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/selection/active-line.min.js" integrity="sha512-0sDhEPgX5DsfNcL5ty4kP6tR8H2vPkn40GwA0RYTshkbksURAlsRVnG4ECPPBQh7ZYU6S3rGvp5uhlGQUNrcmA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/hint/show-hint.min.js" integrity="sha512-yhmeAerubMLaGAsyS7sE8Oqub6GeTkBDQpkXo2JKHgg7JOCudQvcbDQc5rPxdl7MqcDusTJzSy+ODlyzAwETfQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/python/python.min.js" integrity="sha512-2M0GdbU5OxkGYMhakED69bw0c1pW3Nb0PeF3+9d+SnwN1ryPx3wiDdNqK3gSM7KAU/pEV+2tFJFbMKjKAahOkQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/fold/foldcode.min.js" integrity="sha512-Q2qfEJEU257Qlqc4/5g6iKuJNnn5L0xu2D48p8WHe9YC/kLj2UfkdGD01qfxWk+XIcHsZngcA8WuKcizF8MAHA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/fold/brace-fold.min.js" integrity="sha512-5MuaB1PVXvhsYVG0Ozb0bwauN7/D1VU4P8dwo5E/xiB9SXY+VSEhIyxt1ggYk2xaB/RKqKL7rPXpm1o1IlTQDA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/fold/indent-fold.min.js" integrity="sha512-Q6g5qQfa6ko+Y+0BwAciUAq01qxgfScTPFP2Fsrr+zIrTe5Yq3tN5xaA919MmBs/1RMz/jyctknYavjc3k+/xg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/fold/comment-fold.min.js" integrity="sha512-POq5oizlc/SrDJVaPG9eRo020t5igLlyXnOEPl854IgtRDnRCi9D3RAdOS1dhZ3Y0SmcyDVwyt2z2uFj3WYcbg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/edit/closebrackets.min.js" integrity="sha512-tsjcYO5hFvViRssxiM7Jhd8601epWOx1He3Hl4yuI5dKKPxr43KxkOhc9GZeeqzlYJm9ABb7UPA9697NiqZZ7Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/edit/matchbrackets.min.js" integrity="sha512-GSYCbN/le5gNmfAWVEjg1tKnOH7ilK6xCLgA7c48IReoIR2g2vldxTM6kZlN6o3VtWIe6fHu/qhwxIt11J8EBA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/scroll/simplescrollbars.min.js" integrity="sha512-1Vc3i/yplqkVbJBGgEpx9odVj3SLHMx2EOsQOMJsHbM5LRPL2iaPH2sEE+8sZOCqvuXGignKEwmTqO6/b11RqQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/scroll/simplescrollbars.min.css" integrity="sha512-2y3NTsei81d5emn5nwrdflyI5EGULwKXRZ0BCbO55cjgQ8x62X4ydH/jbnzrKnxArstf79F9n6z1j2MtVmJ8YA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.css" integrity="sha512-uf06llspW44/LZpHzHT6qBOIVODjWtv4MxCricRxkzvopAlSWnTf6hpZTFxuuZcuNE9CBQhqE0Seu1CoRk84nQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/hint/show-hint.min.css" integrity="sha512-OmcLQEy8iGiD7PSm85s06dnR7G7C9C0VqahIPAj/KHk5RpOCmnC6R2ob1oK4/uwYhWa9BF1GC6tzxsC8TIx7Jg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/fold/foldgutter.min.css" integrity="sha512-YwkMTlTHn8dBnwa47IF+cKsS00HPiiVhQ4DpwT1KF2gUftfFR7aefepabSPLAs6zrMyD89M3w0Ow6mQ5XJEUCw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/hint/show-hint.min.css" integrity="sha512-OmcLQEy8iGiD7PSm85s06dnR7G7C9C0VqahIPAj/KHk5RpOCmnC6R2ob1oK4/uwYhWa9BF1GC6tzxsC8TIx7Jg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/lint/lint.min.css" integrity="sha512-jP1+o6s94WQS9boYeDP3Azh8ihI5BxGgBZNjkABhx05MqH5WuDzfzSnoPxGxVzWi/gxxVHZHvWkdRM6SMy5B0Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/theme/monokai.min.css" integrity="sha512-R6PH4vSzF2Yxjdvb2p2FA06yWul+U0PDDav4b/od/oXf9Iw37zl10plvwOXelrjV2Ai7Eo3vyHeyFUjhXdBCVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />`);
    // load interact
    await loadLibrary(`<script src="https://cdnjs.cloudflare.com/ajax/libs/interact.js/1.10.17/interact.min.js" integrity="sha512-XcVj3UAxYb1bcxemjAU6ncOu6lhnuRz98icTuL+jrJE+2SCWFMZFc+5FaFsNikLKujDfL71c4LK5OBz1lsAKag==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>`);
    const pyodide = await loadPyodide();

    const notebook_template = `<div class="pynote-boarder">
    <div class="pynote-dragbar">
        <div class="pynote-title">Python</div>
        <div class="pynote-control">
            <div class="pynote-incsize">+</div>
            <div class="pynote-decsize">-</div>
        </div>
    </div>
    <div class="pynote-panel">
        <textarea class="pynote-editor"></textarea>
        <textarea class="pynote-output"></textarea>
    </div>
</div>`;

    function initCodeMirror(editor, output) {
        const cm_editor = CodeMirror.fromTextArea(editor, {
            mode: "python",
            version: 3,
            theme: "monokai",
            keyMap: "sublime",
            lineNumbers: true,
            smartIndent: true,
            indentUnit: 4,
            indentWithTabs: true,
            lineWrapping: true,
            //gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            foldGutter: true,
            autofocus: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            styleActiveLine: true,
            scrollbarStyle: "overlay",
        });
        const cm_output = CodeMirror.fromTextArea(output, {
            mode: "text/plain",
            theme: "monokai",
            keyMap: "sublime",
            lineNumbers: false,
            smartIndent: true,
            indentUnit: 4,
            indentWithTabs: true,
            lineWrapping: true,
            //gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            foldGutter: true,
            autofocus: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            styleActiveLine: true,
            readOnly: "nocursor",
            scrollbarStyle: "overlay",
        });
        cm_editor.setSize("100%", "50%");
        cm_output.setSize("100%", "50%");
        return [cm_editor, cm_output];
    }

    function initPyodide(editor, output) {
        pyodide.runPython(`
            import sys
            import io
        `);
        function evaluatePython() {
            try {
                pyodide.runPython("sys.stdout = io.StringIO()");
                const py_output = pyodide.runPython(editor.getValue());
                const stdout = pyodide.runPython("sys.stdout.getvalue()");
                output.getDoc().setValue(stdout);
            } catch (err) {
                const stdout = pyodide.runPython("sys.stdout.getvalue()");
                const outputlines = (stdout.match(/\n/g) || []).length;
                output.getDoc().setValue(stdout + err);
                output.markText(
                    { line: outputlines, ch: 0 },
                    { line: output.lineCount(), ch: 0 },
                    { className: "pynote-error-msg" }
                );
            }
        }
        editor.on("change", evaluatePython);
    }

    function initInteract(pywindow, dragbar) {
        const pywin = interact(pywindow)
            .resizable({
                // resize from all edges and corners
                edges: { left: true, right: true, bottom: true, top: true },
                margin: 10,
                listeners: {
                    move(event) {
                        let target = event.target;
                        let x = (parseFloat(target.getAttribute('data-x')) || 0);
                        let y = (parseFloat(target.getAttribute('data-y')) || 0);
                        // update the element's style
                        target.style.width = event.rect.width + 'px';
                        target.style.height = event.rect.height + 'px';
                        // translate when resizing from top or left edges
                        x += event.deltaRect.left;
                        y += event.deltaRect.top;
                        target.style.transform = 'translate(' + x + 'px,' + y + 'px)';
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                        //target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
                    }
                },
                modifiers: [
                    // keep the edges inside the parent
                    interact.modifiers.restrictEdges({
                        outer: 'parent'
                    }),
                    // minimum size
                    interact.modifiers.restrictSize({
                        min: { width: 196, height: 57 }
                    })
                ],
                inertia: true,
            });
        let dbar = interact(dragbar)
            .draggable({
                listeners: {
                    move(event) {
                        let target = event.target.parentNode.parentNode,
                            // keep the dragged position in the data-x/data-y attributes
                            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                        // translate the element
                        target.style.webkitTransform =
                            target.style.transform =
                            'translate(' + x + 'px, ' + y + 'px)';

                        // update the posiion attributes
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    }
                },
                inertia: true,
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: true
                    })
                ]
            });
        return [pywin, dbar];
    }

    function PyNote(place, options) {
        const target = document.querySelector(place);
        target.appendChild(parseElement(notebook_template));
        target.classList.add("pynote");
        target.style.width = target.offsetWidth + "px";
        target.style.height = target.offsetHeight + "px";

        const [editor, output] = initCodeMirror(
            target.querySelector(".pynote-editor"),
            target.querySelector(".pynote-output")
        );

        initPyodide(editor, output);

        const [pywindow, dragbar] = initInteract(
            target,
            target.querySelector(".pynote-dragbar")
        );
        pywindow.on("resizeend", () => {
            editor.refresh();
            output.refresh();
        });

        let fontSize = 20;

        const editor_elem = editor.getWrapperElement();
        const output_elem = output.getWrapperElement();
        function setFontSize(fontSize) {
            editor_elem.style.fontSize = fontSize;
            output_elem.style.fontSize = fontSize;
            editor.refresh();
            output.refresh();
        }

        setFontSize(`${fontSize}px`);

        const incsz = target.querySelector(".pynote-incsize");
        const decsz = target.querySelector(".pynote-decsize");
        incsz.addEventListener("click", () => {
            fontSize++;
            setFontSize(`${fontSize}px`);
        });
        decsz.addEventListener("click", () => {
            if (fontSize <= 12) return;
            fontSize--;
            setFontSize(`${fontSize}px`);
        });

        return {
            place: place,
            options: options,
            target: target,
            cm: { editor, output },
            setFontSize,
        };
    }

    return PyNote;
})));
