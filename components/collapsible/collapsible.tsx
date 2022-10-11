const Collapsible = () => {
    return (
        <div className="wrap-collabsible">
            <input id="collapsible" className="toggle" type="checkbox" />
            <label htmlFor="collapsible" className="lbl-toggle">
                More Information
            </label>
            <div className="collapsible-content">
                <div className="content-inner">
                    <p>
                        It is necessary that the house has{" "}
                        <strong>internet access</strong> because it is an
                        indispensable tool to be able to telework as a web
                        developer.
                    </p>
                    <p>
                        In Spain we have our own house. But people who know us
                        can give you references. We want to{" "}
                        <strong>rent</strong> a flat in Limerick City for
                        ourselves. Work from home and go to the academy in the
                        afternoons. We have no children and no pets. We are
                        going to{" "}
                        <a
                            href="https://rightwordinstitute.com/"
                            target="_blank"
                            rel="noreferrer"
                            title="Go to Limerick Right word Insitute website"
                        >
                            Rightword Institute
                        </a>
                        , you can ask about us.
                    </p>
                    <p>
                        We are also interested in renting rooms with more
                        roommates. <strong>Double Room</strong> with bathroom or
                        shared bathroom in a <strong>appartment</strong> or a{" "}
                        <strong>house</strong>.
                        <p>
                            In question, find houses to rent or bedroom houses
                            in limerick city centre or heart of limerick. Also
                            is possible a furnished house or not, without share
                            living room or at some minutes drive to share
                            limerick city.
                        </p>
                    </p>
                    <p></p>
                </div>
            </div>
        </div>
    );
};

export default Collapsible;
