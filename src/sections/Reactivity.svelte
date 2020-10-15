<script>
  let count = 0;
  let numbers = [1, 2, 3, 4];

  $: doubled = count * 2;

  $: if (count >= 10) {
    alert("count is too high");
    count = 9;
  }

  $: sum = numbers.reduce((prev, curr) => (prev += curr));

  const handleCount = () => {
    count += 1;
  };

  const addNumber = () => {
    numbers = [...numbers, numbers.length + 1];
  };
</script>

<div class="reactivity">
  <div>
    <button on:click={handleCount}>
      Click
      {count}
      {count === 1 ? 'time' : 'times'}
    </button>
    <p>{count} doubled is {doubled}</p>
  </div>

  <div>
    <p>{numbers.join(' + ')} = {sum}</p>
    <button on:click={addNumber}> Add a number </button>
  </div>
</div>
