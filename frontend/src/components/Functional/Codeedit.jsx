import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import CodeLanguageSelector from './CodeLanguageSelector';
import { CODE_SNIPPETS } from './constants';
import CodeOutput from './CodeOutput';

function Codeedit() {
    const editorRef = useRef();
    const [value, setValue] = useState('');
    const [language, setLanguage] = useState('javascript');

    function onMount(editor) {
        editorRef.current = editor;
        editor.focus();
    }

    function onSelect(selectedLanguage) {
        setLanguage(selectedLanguage);
        setValue(CODE_SNIPPETS[selectedLanguage]);
    }

    return (
        <div className=' bg-gray-600 px-6 min-h-[92vh]'>
            {/* <CodeLanguageSelector language={language} onSelect={onSelect} /> */}

            <div className='flex gap-4 '>
                <div className='w-[60%]'>
                <CodeLanguageSelector language={language} onSelect={onSelect} />
                    <Editor
                        height="80vh"
                        theme="vs-dark"
                        language={language}
                        defaultValue={CODE_SNIPPETS[language]}
                        onMount={onMount}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    />
                </div>
                <CodeOutput editorRef={editorRef} language={language}/>
            </div>
        </div>
    );
}

export default Codeedit;
