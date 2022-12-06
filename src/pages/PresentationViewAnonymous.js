/* eslint-disable */
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";

function PresentationView() {
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
        console.log(data);
        if(data.answer){
            setIsSubmitted(true);
            return;
        }
        One.helpers('jq-notify', {type: 'danger', icon: 'fa fa-times me-1', message: 'Please submit your answer'});
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
        <Container className="w-50 p-3">
            <div className="block-content text-center col-lg-4">
                <h1 className="display-1">Cahut</h1>
                <h2 className="d-flex justify-content-start">How many states are there in USA</h2>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="space-y-2 mb-4 ">
                        <div className="form-check border border-3 rounded" style={{display: "flex", alignItems: "left"}} id = {'A'}>
                            <label className="form-check-label " htmlFor="example-checkbox-default1" style={{margin: "10px"}}>
                                <input className="form-check-input" type="radio" value={'A'} name="example-checkbox-default" {...register("answer")} />
                                50</label>
                        </div>
                        <div className="form-check border rounded border-3" style={{display: "flex", alignItems: "left"}} id = {'B'}>
                            <label className="form-check-label" htmlFor="example-checkbox-default2" style={{margin: "10px"}}>
                                <input className="form-check-input" type="radio" value={'B'} name="example-checkbox-default" {...register("answer")} />
                                51</label>
                        </div>
                        <div className="form-check border rounded border-3" style={{display: "flex", alignItems: "left"}}>
                            <label className="form-check-label" htmlFor="example-checkbox-default3" style={{margin: "10px"}} id = {'C'}>
                                <input className="form-check-input" type="radio" value={'C'} name="example-checkbox-default" {...register("answer")} />
                                52</label>
                        </div>
                    </div>
                    <button type="submit" style={{display: "block", width: "100%" }} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Container>
    );
}

export default PresentationView;
