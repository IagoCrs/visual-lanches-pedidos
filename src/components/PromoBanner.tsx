import React from 'react';
import Image from 'next/image';
import { Card } from './ui/Card';

export const PromoBanner: React.FC = () => {
    return (
        <Card className="!p-0 overflow-hidden">
            {/* A imagem cobre o topo e as bordas ficam arredondadas graças ao estilo do Card */}
            <Image
                src="/promoBanner.jpeg"
                alt="Visual Lanches"
                width={1024}
                height={374}
                className="w-full h-full object-cover"
                priority
            />
        </Card>
    );
};