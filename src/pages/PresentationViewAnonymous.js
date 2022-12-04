import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";

function PresentationViewAnonymous({ slideId }) {
    const question = {
        questionId: '10',
        questionType: "multiple choices",
        rightAnswer: null,
        questionContent: "what year does c++ was invented",
        answer: [
            { answerContent: "2000" },
            { answerContent: "1998" },
            { answerContent: "1988" },
        ]
    }

    const [isSubmitted, setIsSubmitted] = useState(false);
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data)
        setIsSubmitted(true);
    };

    const questionVote = () => {
        return (
            <>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="example-checkbox-default1">
                                <input className="form-check-input" type="radio" value={'A'} name="example-checkbox-default" {...register("answer")} />
                                Option 1</label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="example-checkbox-default2">
                                <input className="form-check-input" type="radio" value={'B'} name="example-checkbox-default" {...register("answer")} />
                                Option 2</label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="example-checkbox-default3">
                                <input className="form-check-input" type="radio" value={'C'} name="example-checkbox-default" {...register("answer")} />
                                Option 3</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </>
        )
    }

    if(isSubmitted){
        return (
            <Container>
                <div className="block-content text-center">
                    <h1>Cahut</h1>
                    <h1>Thanks for your submit, your answer will be recognized</h1>
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <div className="block-content text-center">
                <h1>Cahut</h1>
                <h1>Multiple choices</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="example-checkbox-default1">
                                <input className="form-check-input" type="radio" value={'A'} name="example-checkbox-default" {...register("answer")} />
                                Option 1</label>
                        </div>
                        <div className="form-check">

                            <label className="form-check-label" htmlFor="example-checkbox-default2">
                                <input className="form-check-input" type="radio" value={'B'} name="example-checkbox-default" {...register("answer")} />
                                Option 2</label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="example-checkbox-default3">
                                <input className="form-check-input" type="radio" value={'C'} name="example-checkbox-default" {...register("answer")} />
                                Option 3</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </Container>
    );
}

export default PresentationViewAnonymous;