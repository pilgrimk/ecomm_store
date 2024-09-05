import React from 'react'
import xtype from 'xtypejs'

const Variants = ({ variants, handleSelectedVariant }) => {
  const handleMySelectedVariant = (selected) => {
    const opts = getOptions(selected);
    if (xtype.type(opts) === 'object') {
      for (var key in opts) {
        if (opts.hasOwnProperty(key)) {
          var value = opts[key];

          let obj = {}
          const prop = selected;
          obj['id'] = selected;
          obj[prop] = value;

          handleSelectedVariant(obj);
        }
      }
    }
  }

  const getOptions = (selected) => {
    for (let i = 0; i < variants.length; i++) {
      if (variants[i].id === selected) {
        return variants[i].options;
      }
    }
  }

  return (
    <div className="w-full">
      {(xtype.type(variants) === 'array') ? (
        <div className="p-2.5">
          <div className="flex flex-wrap gap-4" role="radiogroup">
            {variants.map((vrnt) => (
              <label
                key={vrnt.id}
                className="inline-flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  name="variant-option"
                  value={vrnt.id}
                  onChange={() => handleMySelectedVariant(vrnt.id)}
                />
                <span className="ml-2 text-gray-700">{vrnt.description}</span>
              </label>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Variants