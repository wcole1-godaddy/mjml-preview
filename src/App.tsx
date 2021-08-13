import { useEffect, useState } from "react";
import mjml2html from "mjml-browser";
import { compile } from "handlebars";
import { useDebouncedCallback } from "use-debounce";

import "./App.css";

const template = compile(`
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>

        <mj-divider border-color="#F45E43"></mj-divider>

        <mj-text font-size="20px" color="#F45E43" font-family="helvetica">{{title}}</mj-text>

      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`);

function App() {
  const [html, setHtml] = useState("");
  const [inputValue, setInputValue] = useState("Hello World!");

  useEffect(() => {
    const mjml = template({ title: inputValue });
    setHtml(mjml2html(mjml)?.html);
  }, [inputValue]);

  const debounced = useDebouncedCallback(
    (value) => {
      setInputValue(value);
    },
    500,
    { maxWait: 2000 }
  );

  return (
    <div className="App">
      <div className="Aside">
        <div className="Input">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            defaultValue={inputValue}
            onChange={(e) => debounced(e.target.value)}
          />
        </div>
      </div>
      <div className="Main">
        <iframe srcDoc={html} title="MJML Preview" className="Iframe" />
      </div>
    </div>
  );
}

export default App;
