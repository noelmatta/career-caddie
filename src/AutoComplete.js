function AutoComplete({handleTitleChange, titleRef, display, suggestions}) {

  

  const handleSelect = (e) => {
    titleRef.current.value = e.target.value;
    handleTitleChange(e);
  }


  return (
        
    <div style={{display: display ? 'block' : 'none' }} >
      <select size="5">
      {suggestions.map((suggestion, index) => {
        return <option key={index} value={suggestion} onClick={handleSelect}>
            {suggestion}
          </option>
      })}
      </select>      
      
    </div>
  )
}

export default AutoComplete;