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
                        In Spain we have our own house. But people who know us
                        can give us references. We want to rent a flat in
                        Limerick City for ourselves. Work from home and go to
                        the academy in the afternoons. We have no children and
                        no pets. We are going to{" "}
                        <a
                            href="https://rightwordinstitute.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Rightword Institute
                        </a>
                        , you can ask about us and ask for references.
                    </p>
                    <p></p>
                </div>
            </div>
        </div>
    );
};

export default Collapsible;
