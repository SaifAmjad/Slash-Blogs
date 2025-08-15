import React from 'react'

const ToolBox = () => {
  return (
    <div>
        <div id="custom-toolbar" className="mb-2">
  <button className="ql-bold" />
  <button className="ql-italic" />
  <button className="ql-underline" />
  <button className="ql-blockquote" />
  <button className="ql-code-block" />
  
  <select className="ql-header" defaultValue="">
    <option value="2">H2</option>
    <option value="3">H3</option>
    <option value="4">H4</option>
    <option value="5">H5</option>
    <option value="">Normal</option>
  </select>

  <button className="ql-list" value="ordered" />
  <button className="ql-list" value="bullet" />
  <button className="ql-link" />
  <button className="ql-clean" />
</div>

    </div>
  )
}

export default ToolBox