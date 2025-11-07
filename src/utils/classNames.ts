const classNames = (...classes: (string | undefined | Record<string, boolean | undefined>)[]) => {
    return classes
        .reduce<string[]>((acc, classItem) => {
            if (typeof classItem === 'string') {
                acc.push(classItem);
            } else if (classItem && typeof classItem === 'object') {
                Object.entries(classItem).forEach(([key, value]) => {
                    if (value) {
                        acc.push(key);
                    }
                })
            }

            return acc;
        }, [])
        .filter(Boolean).join(" ");
};

export { classNames };
