import React from 'react';
import './FindInfluences.css';
import PhysicsPills from './PhysicsPills';

const FindInfluences = () => {
    return (
        <section className="fi-section">
            <div className="fi-container">
                {/* Physics Engine Layer - Merged into Container */}
                <PhysicsPills />

                {/* Header Content */}
                <div className="fi-header">
                    <h5 className="fi-label">DATABASE</h5>
                    <h1 className="fi-title">
                        Find your <br />
                        influences
                    </h1>
                    <p className="fi-subtitle">
                        Dive into the most complete visual library
                        out there, curated to help you discover the
                        references that shape your creative
                        direction.
                    </p>
                </div>


            </div>
        </section>
    );
};

export default FindInfluences;
