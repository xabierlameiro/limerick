import styles from "./collapsible.module.css";
const Collapsible = () => {
    return (
        <section>
            <input id="collapsible" className={styles.toggle} type="checkbox" />
            <label htmlFor="collapsible" className={styles.lbl_toggle}>
                More Information
            </label>
            <div className={styles.collapsible_content}>
                <div className={styles.content_inner}>
                    <p>
                        It is necessary that the house has{" "}
                        <strong>internet access</strong> because it is an
                        indispensable tool to be able to telework as a web
                        developer.
                    </p>
                    <p>
                        In Spain we have our own house. But people who know us
                        can give you references. We want to{" "}
                        <strong>rent</strong> a flat for ourselves. Work from
                        home and go to the academy in the afternoons. We have no
                        children and no pets. We are going to{" "}
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
                        shared bathroom in a <strong>apartment</strong> or a{" "}
                        <strong>house</strong>.
                    </p>
                    <p>
                        In question, find houses to rent or bedroom houses in
                        heart of limerick. Also is possible a furnished house or
                        not, without share living room or at some minutes drive
                        to share.
                    </p>
                    <p>Group house</p>
                    <p>
                        Seek rooms to rent in this city is hard, in all Ireland.
                        But I looking roommates or flatmates. If you have a room
                        available and want a roommate. Please contact us, we are
                        house hunt.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Collapsible;
