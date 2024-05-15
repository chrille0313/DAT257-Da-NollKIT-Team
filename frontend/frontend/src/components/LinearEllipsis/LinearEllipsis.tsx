import * as React from 'react'
import LinesEllipsis from 'react-lines-ellipsis'

const LinearEllipsis: React.FC = () =>{
    return (
        <div>
            <LinesEllipsis
                text='Lorem Ipsum eller nån skit'
                maxLine='4'
                ellipsis='...'
                trimRight
                basedOn='words'
            />
        </div>
    )
}


export default LinearEllipsis;