import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CatEdit from './CatEdit'
Enzyme.configure({adapter: new Adapter()})

describe("When CatEdit renders", () => {
    it("displays a form", () => {
       const catNew = shallow(<CatEdit />)
       const formGroup = catNew.find("FormGroup")
       expect(formGroup.length).toEqual(4)
       
       const formLabel = catNew.find("Label")
       expect(formLabel.length).toEqual(4)

       const formInput = catNew.find("Input")
       expect(formInput.length).toEqual(4)
    })
})