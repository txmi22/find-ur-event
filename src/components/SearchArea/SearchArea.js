import React from 'react';
function SearchArea (props) {
    return (
        <div className="search-container" style={{
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
        }}>
            <div className="search-bar row white-text">
                <section className="col-sm-5">
                    <form action="" onSubmit={props.handleSubmit}>
                        <div className="input-field">
                        <i className="material-icons prefix">place</i>
                            <input className="white-text" placeholder="Search events" type="text" onChange={props.handleChange}/>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default SearchArea;