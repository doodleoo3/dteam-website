import React from 'react';
import PageTitle from "@/src/shared/ui/page-title/PageTitle";
import styles from "./FeaturesPage.module.scss"

const FeaturesPage = () => {
    return (
        <>
            <PageTitle>Features</PageTitle>
            <div className={styles.container}>
                <div>
                    <h2>Security</h2>
                    <div>
                        <p>{`1. On our servers, we do not work under a root;`}</p>
                        <p>{`2. We have a firewall configured, as well as a fail2ban system;`}</p>
                        <p>{`3. On the servers where validators work, we close unnecessary or potentially dangerous ports;`}</p>
                        <p>{`4. We uses the Gemalto SafeNet Luna SA HSM to protect important files and confidential information;`}</p>
                        <p>{`5. In case of emergencies, we have a free server to which we can quickly transfer the node.`}</p>
                    </div>
                </div>

                <div>
                    <h2>Alerting</h2>
                    <div>
                        <p>{`For Tendermint based networks we use Tendermint v2, for other networks we use Grafana and Prometheus.`}</p>
                        <p>{`If any of the monitored metrics exceed the allowed value, our team is immediately alerted in a closed Telegram chat as well as a closed Discord group of our employees.`}</p>
                        <p>{`With this system, we can start fixing the problem almost immediately and achieve 99% uptime.`}</p>
                    </div>
                </div>

                <div>
                    <h2>Hardware</h2>
                    <div>
                        <p>{`To ensure 99% uptime, we use high performance bare metal servers with fast internet connections.`}</p>
                        <p>{`We also have the advantage of having uniquely located servers in places like India, Africa, Australia, which helps to keep the network decentralised.`}</p>
                    </div>
                </div>

                <div>
                    <h2>infrastructure</h2>
                    <div>
                        <p>{`We are currently developing, building, improving services and providing IBC relayers for Tendermint based networks. Our ambition is to provide a high quality service that will be used by a large number of active network members.`}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeaturesPage;