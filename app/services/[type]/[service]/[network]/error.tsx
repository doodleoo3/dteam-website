'use client'
import React, { useEffect } from 'react'
import styles from "@/src/shared/ui/service-content-container/ServiceContentContainer.module.scss";

export default function Error({
                                  error
                              }: {
    error: Error & { }
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className={styles.error__container}>
            <h1>Something went wrong</h1>
            <p>You can contact us on <a href="">Twitter</a> or <a href="">Discord</a> so we can start fixing the problem as soon as possible.</p>
        </div>
    )
}