export default function grouper(population, characteristic) {
    let discriminator;
    let grouped = [];

    for (let i = 0; i < population.length; i++) {
        if (discriminator != population[i][characteristic]) {
            let group = { ...population[i] };
            group.messages = [];
            discriminator = population[i][characteristic];
            for (let j = i; j < population.length; j++) {
                if (discriminator != population[j][characteristic]) {
                    break;
                } else {
                    group.messages.push(population[j]);
                    i = j;
                }
            }
            grouped.push(group);
        }
    }

    return grouped.reverse();
}
