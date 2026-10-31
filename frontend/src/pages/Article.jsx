import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { request } from '../lib/api';
import { Seo, PageHero } from '../components/page/PageKit';
import NotFound from './NotFound';

const Article = () => {
    const { slug } = useParams();
    const [state, setState] = useState({ slug: '', item: null, missing: false });

    useEffect(() => {
        let live = true;
        request(`/api/posts/${slug}`)
            .then((res) => { if (live) setState({ slug, item: res.data, missing: false }); })
            .catch(() => { if (live) setState({ slug, item: null, missing: true }); });
        return () => { live = false; };
    }, [slug]);

    const current = state.slug === slug ? state : { item: null, missing: false };
    const { item, missing } = current;

    if (missing) return <NotFound />;
    if (!item) {
        return (
            <div className="pg-page">
                <PageHero eyebrow="Article" title="Loading article" sub="Published articles open here." />
            </div>
        );
    }

    const paragraphs = item.body.split(/\n+/).map((line) => line.trim()).filter(Boolean);

    return (
        <div className="pg-page">
            <Seo
                title={`${item.title} | KAM Global AI`}
                description={item.summary}
                path={`/resources/articles/${item.slug}`}
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Resources', to: '/resources' }, { label: item.title }]}
            />
            <PageHero
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Resources', to: '/resources' }, { label: item.title }]}
                eyebrow="Article"
                title={item.title}
                sub={item.summary}
            />
            <section className="pg-section">
                <div className="container" style={{ maxWidth: 760 }}>
                    {paragraphs.map((line, index) => <p key={`${index}-${line.slice(0, 24)}`}>{line}</p>)}
                    <p><Link to="/resources">Back to resources</Link></p>
                </div>
            </section>
        </div>
    );
};

export default Article;
